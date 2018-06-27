import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ReactiveFormsModule, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
    selector : 'app',
    template : `
    TEST
    <form [formGroup]="formModel" (ngSubmit)="onSubmit()">
        <ul formArrayName="emails">
            <li *ngFor="let e of formModel.get('emails').controls; let i = index">
                <input [formControlName]="i">
            </li>
            <button type="button" (click)="addEmail()">Add Email</button>
        </ul>
        <button type="submit">Submit</button>
    </form>
    <hr>
    <label>Form Value :</label>
    <pre>{{ value }}</pre>
    `
})
class AppComponent {
    formModel : FormGroup = new FormGroup({
        emails : new FormArray([
            new FormControl()
        ])
    });

    get value() {
        return JSON.stringify(this.formModel.value, null, 4);
    }

    addEmail() {
        const emails = this.formModel.get('emails') as FormArray;
        emails.push(new FormControl());
    }

    onSubmit() {
        console.log(this.formModel.value);
    }
}

@NgModule({
    imports : [ BrowserModule, ReactiveFormsModule ],
    declarations : [ AppComponent ],
    bootstrap : [ AppComponent ]
})
class AppModule {}
platformBrowserDynamic().bootstrapModule(AppModule);