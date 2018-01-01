import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, FormControl, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { UserValidators } from '../shared/user.validator';
import { AuthService } from '../authentication/auth.service';
import { GenericValidator } from '../shared/generic-validator';
import { Gender } from '../shared/constants';

import { Observable } from 'rxjs';
import { RegisterBindingModel } from './auth.model';

@Component({
  moduleId: module.id,
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];  
  registerForm: FormGroup; 
  firstSubmit: boolean = false; 
  readonly Gender = Gender;
  
  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Set messages
    this._route.data.subscribe(
      data => {
        this.validationMessages = data['messages'];
        this.genericValidator = new GenericValidator(this.validationMessages);
      }
    );    

    // Set form
    let passwordGroup = this._fb.group({
      password: ['', [Validators.required, Validators.pattern(/^((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20})/)]],
      confirmPassword: ['', Validators.required]
    }, { validator: UserValidators.matchPasswords()});

    this.registerForm = this._fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)], [UserValidators.isUserNameTaken(this._authService)]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      passwords: passwordGroup
    })
  }

  ngAfterViewInit():void {   
    // Watch for the blur event from any input element on the form.
    let controlBlurs: Observable<any>[] = this.formInputElements
    .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

    // Watch for any statusChanges
    Observable.merge(this.registerForm.statusChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.registerForm);
    });
}

  register() {    
    this.firstSubmit = true;
    this.touchFormInputs(this.registerForm);

    console.log(this.registerForm);
    if (!this.registerForm.valid) return;

    let model = new RegisterBindingModel(
      this.registerForm.get('userName').value,
      this.registerForm.get('gender').value,
      this.registerForm.get('email').value,
      this.registerForm.get('passwords.password').value,
      this.registerForm.get('passwords.confirmPassword').value
    )

    console.log(model);

    this._authService.register(model).subscribe(
      data => console.log(data)
    )
  }

  private touchFormInputs(c: FormGroup) {
    Object.keys(c.controls).forEach(field => {  
      const control = c.get(field);            
      if (control instanceof FormControl) {          
        if (control.valid) return;
        control.updateValueAndValidity();          
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        
        this.touchFormInputs(control);            
      }
    });
  }
}
