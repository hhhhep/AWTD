import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
@Component({
    selector : 'app',
    template : `
        <h1>AllProducts</h1>
    `
})
class AppComponent {

}
@NgModule({
    imports : [ BrowserModule ],
    declarations : [ AppComponent ],
    bootstrap : [ AppComponent ]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);