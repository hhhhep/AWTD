import { NgModule, Component, Directive } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, FormControl, NG_VALIDATORS, FormGroup } from '@angular/forms';

function ssnValidator(control : FormControl) : { [key : string] : any } {
    const value : string = control.value || '';
    const valid = value.match(/^\d{9}$/);
    return valid ? null : { ssn : true };
}

@Directive({
    selector : '[ssn]',
    providers : [{
        provide : NG_VALIDATORS,
        useValue : ssnValidator,
        multi : true
    }]
})
class SsnValidatorDirective {}

function equalValidator({ value } : FormGroup) : { [key : string] : any } {
    const [first, ...rest] = Object.keys(value || {});
    const valid = rest.every(v => value[v] === value[first]);
    return valid ? null : { equal : true };
}
@Directive({
    selector : '[equal]',
    providers : [{
        provide : NG_VALIDATORS,
        useValue : equalValidator,
        multi : true
    }]
})
class EqualValidatorDirective {}


@Component({
    selector : 'app',
    template : `
        <form #f="ngForm" (ngSubmit)="onSubmit(f.value, f.valid)" novalidate>
            <div>
                <p>
                    Username :
                    <input type="text" name="username" ngModel required>
                    <span [hidden]="!f.form.hasError('required', 'username')">Username is required</span>
                </p>
            </div>
            <div>
                <p>
                    SSN :
                    <input type="text" name="ssn" ngModel ssn>
                    <span [hidden]="!f.form.hasError('ssn', 'ssn')">SSN in invalid</span>
                </p>
            </div>
            <div ngModelGroup="passwordsGroup" equal>
                <div>
                    <p>
                        Password :
                        <input type="password" name="password" ngModel minlength="5">
                        <span [hidden]="!f.form.hasError('minlength', ['passwordsGroup', 'password'])">Password is too short</span>
                    </p>
                </div>
                <div>
                    <p>
                        Confirm Password :
                        <input type="password" name="pconfirm" ngModel>
                        <span [hidden]="!f.form.hasError('equal', 'passwordsGroup')">Passwords must be the same</span>
                    </p>
                </div>
            </div>
            <button type="submit">Submit</button>
        </form>
    `
})
class AppComponent {
    onSubmit(formValue : any, isFormValid : boolean) {
        if (isFormValid) {
            console.log(formValue);
        }
    }
}

@NgModule({
    imports : [ BrowserModule, FormsModule ],
    declarations : [ AppComponent, SsnValidatorDirective, EqualValidatorDirective ],
    bootstrap : [ AppComponent ]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);