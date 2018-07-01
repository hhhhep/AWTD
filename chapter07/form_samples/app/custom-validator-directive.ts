import { NgModule, Component, Directive } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, FormControl, NG_VALIDATORS } from "@angular/forms";

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

@Component({
    selector : 'app',
    template : `
        <form #f="ngForm">
            <p>
                SSN : <input type="text" name="my-ssn" ngModel ssn>
                <span [hidden]="!f.form.hasError('ssn', 'my-ssn')">SSN is invalid</span>
            </p>
        </form>
    `
})
class AppComponent {}

@NgModule({
    imports : [ BrowserModule, FormsModule ],
    declarations : [ AppComponent, SsnValidatorDirective ],
    bootstrap : [ AppComponent ]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);