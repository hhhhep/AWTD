import { FormControl, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { NgModule, Component } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { BrowserModule } from "@angular/platform-browser";

function ssnValidator(control : FormControl) : { [key : string] : any } {
    const value : string = control.value || '';
    const valid = value.match(/^\d{9}$/);
    return valid ? null : { ssn : true };
}

function equalValidator({ value } : FormGroup) : { [key : string] : any } {
    const [first, ...rest] = Object.keys(value || {});
    const valid = rest.every(v => value[v] === value[first]);
    return valid ? null : { equal : true };
}

@Component({
    selector : 'app',
    template : `
        <form [formGroup]="formModel" (ngSubmit)="onSubmit()" novalidate>
            <div>
                <p>
                    Username :
                    <input type="text" formControlName="username">
                    <span [hidden]="!formModel.hasError('required', 'username')">Username is required</span>
                </p>
            </div>
            <div>
                <p>
                    SSN :
                    <input type="text" formControlName="ssn">
                    <span [hidden]="!formModel.hasError('ssn', 'ssn')">SSN is invalid</span>
                </p>
            </div>
            <div formGroupName="passwordsGroup">
                <div>
                    <p>
                        Password :
                        <input type="password" formControlName="password">
                        <span [hidden]="!formModel.hasError('minlength', ['passwordsGroup', 'password'])">Password is too short</span>
                    </p>
                </div>
                <div>
                    <p>
                        Confirm password :
                        <input type="password" formControlName="pconfirm">
                        <span [hidden]="!formModel.hasError('equal', 'passwordsGroup')">
                            Passwords must be same
                        </span>
                    </p>
                </div>
            </div>
            <button type="submit">Submit</button>
        </form>
    `
})
class AppComponent {
    formModel : FormGroup;

    constructor() {
        this.formModel = new FormGroup({
            'username' : new FormControl('', Validators.required),
            'ssn' : new FormControl('', ssnValidator),
            'passwordsGroup' : new FormGroup({
                'password' : new FormControl('', Validators.minLength(5)),
                'pconfirm' : new FormControl('')
            }, equalValidator)
        });
    }

    onSubmit() {
        if (this.formModel.valid) {
            console.log(this.formModel.value);
        }
    }
}

@NgModule({
    imports : [ BrowserModule, ReactiveFormsModule ],
    declarations : [ AppComponent ],
    bootstrap : [ AppComponent]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);