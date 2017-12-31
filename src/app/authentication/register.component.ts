import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserValidators } from '../shared/user.validator';
import { AuthService } from '../authentication/auth.service';

@Component({
  moduleId: module.id,
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;  

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this.registerForm = this._fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)], [UserValidators.isUserNameTaken(this._authService)]]
    })
  }

  register() {
    console.log(this.registerForm);
  }
}
