import { Injectable, EventEmitter } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export class Product {
    constructor(public id : number,
                public title : string,
                public price : number,
                public rating : number,
                public description : string,
                public categories : string[]) {
    }
}

export class Review {
    constructor(public id : number,
                public productId : number,
                public timestamp : Date,
                public user : string,
                public rating : number,
                public comment : string) {            
    }
}

export interface ProductSearchParams {
    title : string;
    minPrice : number;
    maxPrice : number;
}

@Injectable()
export class ProductService {

    searchEvent : EventEmitter = new EventEmitter();

    constructor(private http : Http) {}

    getProducts() : Observable<Product[]> {
        return this.http.get('/products')
            .map(response => response.json());
    }

    getProductById(productId : number) : Observable<Product> {
        return this.http.get(`/products/${productId}`)
            .map(response => response.json());
    }

    getReviewsForProduct(productId : number) : Observable<Review[]> {
        return this.http
            .get(`/products/${productId}/reviews`)
            .map(response => response.json())
            .map(reviews => reviews.map(
                (r : any) => new Review(
                    r.id,
                    r.productId,
                    new Date(r.timestamp),
                    r.user,
                    r.rating,
                    r.comment
            )));
    }

    search(params : ProductSearchParams) : Observable<Product[]> {
        return this.http
            .get('/products', { search : encodeParams(params) })
            .map(response => response.json());
    }

    getAllCategories() : string[] {
        return ['Books', 'Electronics', 'Hardware'];
    }
}

function encodeParams(params : any) : URLSearchParams {
    const queryStr = new URLSearchParams();

    if (params.title !== null && params.title !== '') {
        queryStr.append('title', params.title);
    }

    if (params.price !== null) {
        queryStr.append('price', params.price);
    }

    if (params.category !== -1) {
        queryStr.append('category', params.category);
    }

    return queryStr;
}