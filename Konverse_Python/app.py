# from flask import request
# from app import app
#
#
#
import os, io, re, uuid, requests
from pathlib import Path

import urllib.request
from inscriptis import get_text

import ebooklib
from ebooklib import epub

from flask import Flask, request
from flask_restful import Resource, Api
from flask import request, Response, jsonify, json, abort
from flask_restful import Resource, Api
from flask_cors import CORS
from werkzeug.utils import secure_filename

import convex
from convex import ConvexClient

from bs4 import BeautifulSoup

import google.generativeai as genai
from pypdf import PdfReader

import docx
import pandas as pd


from langchain_community.document_loaders import UnstructuredEPubLoader


from dotenv import load_dotenv
dotenv_path = Path("./.env")
load_dotenv(dotenv_path=dotenv_path)
from pprint import pprint
    

app = Flask(__name__)
api = Api(app, prefix="/api")
CORS(app, resources={r"/*": {"origins": "*"}})

client = ConvexClient("https://valuable-pigeon-564.convex.cloud/")


#genai.configure(api_key=os.environ.get("API_KEY"))
genai.configure(api_key="AIzaSyD7MNp17p7fETipsjTdqaoVRDUn0m_8BEw")
model = genai.GenerativeModel("gemini-1.5-flash")
embedding_model = "models/text-embedding-004"
embedding_dimensions = 768



def InlineFormatting(text):
    text = re.sub(r"\_(.+?)_\|", "", text)
    text = re.sub(r"\*\*(.+?)\*\*", "", text)
    return text


def saveEmbeddings(document):
    embeddings = genai.embed_content(
         model=embedding_model, content=document, task_type="retrieval_document"
    )["embedding"][0]            
           
    data = {
        "fileID": request.form.get("fileID"),
        "content": document,
        "embeddings": embeddings
    } 
            
    client.mutation("konverseMutations:AddEmbeddings", data)

    return jsonify(response="Success")

class NewDocumentEmbeddings(Resource):
    def post(self):
        document = []

        if request.files.get("file"):           
            
            if (request.form.get("fileType") == 'pdf'):
                reader = PdfReader(request.files.get("file"))
                pages = len(reader.pages)

                for page in range(int(pages)):
                    _page = reader.pages[page]

                    document.append(re.sub(r"[^a-zA-Z0-9\s]", "", _page.extract_text()))          
           
                return saveEmbeddings(document)
                
            
            elif (request.form.get("fileType") == "xlsx"):
                document = pd.read_excel(request.files.get("file"))
                
                
                return saveEmbeddings(document)

            
            elif (request.form.get("fileType") == "docx"):
                doc = docx.Document(request.files.get("file"))
                text = []
                for para in doc.paragraphs:
                    text.append(para.text)          
                document.append(re.sub(r"[^a-zA-Z0-9\s]", "", '\n'.join(text)))
                
                return saveEmbeddings(document)
            
            elif (request.form.get("fileType") == "html"):
                htmlDoc = request.files.get("file").read()
                
                soup = BeautifulSoup(htmlDoc, "html.parser")
                text = soup.get_text().replace("\n", "")
                doc = [] 
                doc.append(text.replace("!@#$%^&*()[]{};:,./<>?\|`~-=_+“", " "))
        
                return saveEmbeddings(doc)

            
            elif (request.form.get("fileType") == "txt"):
                file = request.files.get("file")              
                document.append(re.sub(r"[^a-zA-Z0-9\s]", "", str(file.read())))
                
                return saveEmbeddings(document)
                        
            else:
                return jsonify(response="We currently have no support for the uploaded document. We only support .docx, .pdf, .txt and .xlsx")

        else:
            abort(400)


api.add_resource(NewDocumentEmbeddings, "/embeddings/new")



class GetEmbeddingsFromURL(Resource):
    def post(self):    
        html = urllib.request.urlopen(request.form.get('url')).read().decode('utf8').encode('ascii', 'ignore').decode('utf-8')
    
        soup = BeautifulSoup(html, "html.parser")
        text = soup.get_text().replace("\n", "")
    
        reformatted_text = text.replace("!@#$%^&*()[]{};:,./<>?\|`~-=_+“", " ")
        
        return saveEmbeddings(reformatted_text)


api.add_resource(GetEmbeddingsFromURL, "/embeddings/url")



class GetDocumentEmbeddings(Resource):
    def post(self):
        query = request.form.get("prompt")

        query_embeddings = genai.embed_content(
            model=embedding_model, content=[query], task_type="retrieval_query"
        )["embedding"][0]
        
        fileEmbeddings = client.mutation("konverseMutations:AddEmbeddings", { "embeddings": query_embeddings})

        

        return jsonify(response=InlineFormatting(fileEmbeddings.text))

api.add_resource(GetDocumentEmbeddings, "/embeddings")




if __name__ == "__main__":
    app.run(debug=True)
    