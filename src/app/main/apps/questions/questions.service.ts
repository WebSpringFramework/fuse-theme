import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class QuestionsService implements Resolve<any>
{
    pages: any;
    products: any[];
    onProductsChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    ) {
        // Set the defaults
        this.onProductsChanged = new BehaviorSubject({});
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
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

    /**
     * Get products
     *
     * @returns {Promise<any>}
     */
    // getProducts(): Promise<any>
    // {
    //     return new Promise((resolve, reject) => {
    //         this._httpClient.get('api/e-commerce-products')
    //             .subscribe((response: any) => {
    //                 this.products = response;
    //                 this.onProductsChanged.next(this.products);
    //                 resolve(response);
    //             }, reject);
    //     });
    // }

    getProducts(page = 1, perPage = 100): Promise<any> {
        return new Promise((resolve, reject) => {
            let email = sessionStorage.getItem('ACCESS_EMAIL');
            let passw = sessionStorage.getItem('ACCESS_PASSW');
            let headers = new HttpHeaders()
                .set('X-User-Email', email)
                .set('X-Api-Key', passw)
                .set('X-Accountmanager-Key', 'xk21bPa9jQ')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json');
            this._httpClient.get(`https://api.skyhub.com.br/products?page=${page}&per_page=${perPage}`, { headers })
                .subscribe((response: any) => {
                    // console.log('getProducts', response);
                    this.products = response.products;
                    this.pages = Math.ceil(response.total / perPage);
                    // console.log('pages', this.pages);
                    this.onProductsChanged.next(this.products);
                    resolve(response.products);
                }, reject);
        });
    }


    searchProductSKU(SKU): Promise<any> {
        return new Promise((resolve, reject) => {
            let email = sessionStorage.getItem('ACCESS_EMAIL');
            let passw = sessionStorage.getItem('ACCESS_PASSW');
            let headers = new HttpHeaders()
                .set('X-User-Email', email)
                .set('X-Api-Key', passw)
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json');
            this._httpClient.get('https://api.skyhub.com.br/products?filters[sku]=' + SKU, { headers })
            .subscribe((response: any) => {
                // console.log('getProducts', response);
                this.products = response.products;
                this.pages = Math.ceil(response.total / 100);
                // console.log('pages', this.pages);
                this.onProductsChanged.next(this.products);
                resolve(response.products);
            }, reject);
        });
    }    
}
