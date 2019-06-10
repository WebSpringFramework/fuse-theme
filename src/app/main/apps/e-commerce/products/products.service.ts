import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from './../../../../../environments/environment';
import { HeadersService } from '@fuse/services/headers.service';

@Injectable()
export class EcommerceProductsService implements Resolve<any> {

    page: any;
    pages: any;
    products: any[];
    onProductsChanged: BehaviorSubject<any>;

    private readonly API = `${environment.baseURL}/products`;

    constructor(private _httpClient: HttpClient, private _headerService: HeadersService) {
        this.onProductsChanged = new BehaviorSubject({});
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getProducts()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }    

    getProducts(page = 1, per_page = 100) {
        return new Promise((resolve, reject) => {
            
            let api = `${this.API}?page=${page}&per_page=${per_page}`;
            let headers = this._headerService.getHeaders();
            
            this._httpClient.get<any>(api, {headers})
            .subscribe(
                (data) => {
                    //console.log(data);

                    this.products = data.products;                    
                    this.page = page;
                    this.pages = Math.ceil(data.total / 100);                    
                    this.onProductsChanged.next(this.products);

                    resolve(data.products);
                },
                (error) => 
                {
                    console.error(error.error.message);
                    
                    reject(error);
                }
            ); 
        });
    }

    searchProduct(SKU) {
        return new Promise((resolve, reject) => {

            let api = `${this.API}?page=1&filters[sku]=${SKU}`;
            let headers = this._headerService.getHeaders();
            
            return this._httpClient.get<any>(api, {headers})
            .subscribe(
                (data) => {
                    //console.log(data);
                    
                    this.products = data.products;                    
                    this.page = 1;
                    this.pages = Math.ceil(data.total / 100);                    
                    this.onProductsChanged.next(this.products);

                    resolve(data.products);
                },
                (error) => 
                {
                    console.error(error.error.message);
                    
                    reject(error);
                }
            ); 
        });
    }
}