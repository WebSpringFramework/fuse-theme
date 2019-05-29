import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class EcommerceOrdersService implements Resolve<any>
{
    pages: any;
    orders: any[];
    onOrdersChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    )
    {
        // Set the defaults
        this.onOrdersChanged = new BehaviorSubject({});
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getOrders()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get orders
     *
     * @returns {Promise<any>}
     */
    // getOrders(): Promise<any>
    // {
    //     return new Promise((resolve, reject) => {
    //         this._httpClient.get('api/e-commerce-orders')
    //             .subscribe((response: any) => {
    //                 this.orders = response;
    //                 this.onOrdersChanged.next(this.orders);
    //                 resolve(response);
    //             }, reject);
    //     });
    // } 
    
    getOrders(page = 1, startDate = '27/05/2019', endDate = '27/05/2019', perPage = 100): Promise<any>
    {
        return new Promise((resolve, reject) => {
            let email = sessionStorage.getItem('ACCESS_EMAIL');
            let passw = sessionStorage.getItem('ACCESS_PASSW');
            let headers = new HttpHeaders()
            .set('X-User-Email', email)
            .set('X-Api-Key', passw)
            .set('X-Accountmanager-Key', 'xk21bPa9jQ')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json');
            this._httpClient.get(`https://api.skyhub.com.br/orders?filters[start_date]=${startDate}&filters[end_date]=${endDate}&page=${page}&per_page=${perPage}`, {headers})
                .subscribe((response: any) => {
                    console.log(response);
                    this.orders = response.orders;
                    this.pages = Math.ceil(response.total / perPage);
                    // console.log('pages', this.pages);
                    this.onOrdersChanged.next(this.orders);
                    resolve(response.orders);
                }, reject);
        });
    }  
    
    searchOrderCODE(CODE): Promise<any> {
        return new Promise((resolve, reject) => {
            let email = sessionStorage.getItem('ACCESS_EMAIL');
            let passw = sessionStorage.getItem('ACCESS_PASSW');
            let headers = new HttpHeaders()
                .set('X-User-Email', email)
                .set('X-Api-Key', passw)
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json');
            this._httpClient.get('https://api.skyhub.com.br/orders/' + CODE, { headers })
            .subscribe((response: any) => {
                console.log(response);
                this.orders = [response];
                this.pages = 1;
                // console.log('pages', this.pages);
                this.onOrdersChanged.next(this.orders);
                resolve(response);
            }, reject);
        });
    }         
}
