import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Authenticate } from '../../models/user';

@Component({
  selector: 'app-sign-in',
  templateUrl: 'sign-in.component.html',
  styleUrls: ['sign-in.component.css']
})

export  class SignInComponent {

  @Output() emailSubmission = new EventEmitter<Authenticate>();

  form: FormGroup = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl('', Validators.required),
  });

  constructor() {}

  login() {
    if (this.form.valid) {
      this.emailSubmission.emit(this.form.value);
    } 
  }


}
