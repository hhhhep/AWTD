import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector : 'app',
    template : `
    <html>
        <form #f="ngForm" (ngSubmit)="onSubmit(f.value)">
            <div>Username : <input type="text" name="username" ngModel></div>
            <div>SSN : <input type="text" name="ssn" ngModel></div>
            <div ngModelGroup="passwordsGroup">
                <div>Password : <input type="password" name="password" ngModel></div>
                <div>Confirm password : <input type="password" name="pconfirm" ngModel></div>
            </div>
            <button type="submit">Submit</button>
        </form>
    </html>
    `
})
class AppComponent {
    onSubmit(formValue : any) {
        console.log(formValue);
    }
}

@NgModule({
    imports : [ BrowserModule, FormsModule, ReactiveFormsModule ],
    declarations : [ AppComponent ],
    bootstrap : [ AppComponent ]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);