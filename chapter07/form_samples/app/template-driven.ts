import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector : 'app',
    template : `test`
})
class AppComponent {}

@NgModule({
    imports : [ BrowserModule, FormsModule, ReactiveFormsModule ],
    declarations : [ AppComponent ],
    bootstrap : [ AppComponent ]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);