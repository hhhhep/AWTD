import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import ApplicationComponent from './components/application/application.component';
import CarouselComponent from './components/carousel/carousel.component';
import FooterComponent from './components/footer/footer.component';
import NavbarComponent from './components/navbar/navbar.component';
import ProductItemComponent from './components/product-item/product-item.component';
import SearchComponent from './components/search/search.component';
import StarsComponent from './components/stars/stars.component';
import { ONLINE_AUCTION_SERVICES } from './services/services';
import HomeComponent from './components/home/home.component';
import ProductDetailComponent from './components/product-detail/product-detail.component';
import { myComponents } from './components';
import { FilterPipe } from './components/pipes/filter.pipe';

@NgModule({
    imports : [BrowserModule, FormsModule, ReactiveFormsModule, HttpModule,
        RouterModule.forRoot([
            { path : '', component : HomeComponent },
            { path : 'products/:productId', component : ProductDetailComponent }
        ])],
    declarations : [
        myComponents,
        FilterPipe
    ],
    providers : [ ONLINE_AUCTION_SERVICES,
        { provide : LocationStrategy, useClass : HashLocationStrategy }],
    bootstrap : [ApplicationComponent]
})
export class AppModule {}