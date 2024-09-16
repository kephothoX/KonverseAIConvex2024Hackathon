import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.dev';
import { AuthnService } from 'src/app/authn/authn.service';
import { AppService } from 'src/app/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Buffer } from 'buffer';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  formData = new FormData();
  PromptResponse: any;


  constructor(
    private _appService: AppService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _authnService: AuthnService,
    private _matSnackBar: MatSnackBar
  ) { }


  ngOnInit(): void {

  }






}
