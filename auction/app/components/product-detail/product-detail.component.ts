import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, Review, ProductService } from '../../services/product.service';
import StarsComponent from '../stars/stars.component';

@Component({
    selector : 'auction-product-page',
    templateUrl : 'app/components/product-detail/product-detail.component.html',
    directives : [StarsComponent]
})
export default class ProductDetailComponent {
    product : Product;
    reviews : Review[];

    newComment : string;
    newRating : number;
    
    constructor (route : ActivatedRoute, productService : ProductService) {
        let prodId : number = parseInt(route.snapshot.params['productId']);
        this.product = productService.getProductById(prodId);
        this.reviews = productService.getReviewsForProduct(this.product.id);
    }
}