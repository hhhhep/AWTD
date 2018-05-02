import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector : 'seller',
    template : "The seller of this product is Mary Lou (98%)",
    styles : ['seller { background : yellow }'],
    encapsulation : ViewEncapsulation.None
})
export class SellerInfoComponent {
    sellerID : string;

    constructor(route : ActivatedRoute) {
        this.sellerID = route.snapshot.params['id'];
        console.log(`The SellerInfoComponent got the seller id ${this.sellerID}`);
    }
}