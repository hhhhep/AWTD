import { FormControl, ReactiveFormsModule, FormGroup, FormsModule } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { NgModule, Component } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

function asyncSsnValidator(control : FormControl) : Observable<any> {
    const value : string = control.value || '';
    const valid = value.match(/^\d{9}$/);
    return Observable
        .of(valid ? null : { ssn : true })
        .delay(1000);
}

@Component({
    selector : 'app',
    template : `
    <form [formGroup]="form">
        <p>
            SSN : <input type="text" formControlName="my-ssn">
            <span>{{ form.status }}</span>
        </p>
        
    </form>
    <p>
        <style>.hasError { border : 1px solid red; }</style>
        <input type="text" required
            name="username" ngModel #c="ngModel"
            [class.hasError]="c.invalid && c.touched">
    </p>
    `
})
class AppComponent {
    form : FormGroup;

    constructor() {
        this.form = new FormGroup({
            'my-ssn' : new FormControl('', null, asyncSsnValidator)
        });
    }
}

@NgModule({
    imports : [ BrowserModule, FormsModule, ReactiveFormsModule ],
    declarations : [ AppComponent ],
    bootstrap : [ AppComponent ]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);