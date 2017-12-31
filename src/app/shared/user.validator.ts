import { AbstractControl, ValidatorFn } from "@angular/forms";
import { AsyncValidatorFn, ValidationErrors } from "@angular/forms/src/directives/validators";
import { AuthService } from "app/authentication/auth.service";
import { Observable } from "rxjs/Observable";

export class UserValidators {   

    static isUserNameTaken(service: AuthService): AsyncValidatorFn {
        return (c: AbstractControl): Promise<ValidationErrors> | Observable<ValidationErrors> => {            
            return Observable
                .timer(800)
                .switchMap(() => {
                    return service
                        .checkName(c.value)
                        .map((res) => {
                            return (res ? null : { 'isUserNameTaken': true })
                        })
                });
        }
    }

}    