import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from './../../../../../environments/environment';
import { HeadersService } from '@fuse/services/headers.service';

@Injectable()
export class EcommerceOrdersService implements Resolve<any> {

    page: any;
    pages: any;
    total:any;

    orders: any[];
    onOrdersChanged: BehaviorSubject<any>;

    dateStart: any;
    dateEnd: any;
    marketplace: any;
    status: any;

    channels: any;
    statuses: any;

    private readonly API = `${environment.baseURL}/orders`;
    private readonly API_MARKETPLACES = `${environment.baseURL}/sale_systems`;
    private readonly API_STATUSES = `${environment.baseURL}/statuses`;

    constructor(private _httpClient: HttpClient, private _headerService: HeadersService) {
        this.onOrdersChanged = new BehaviorSubject({});
        let now = new Date();
        let today = this.formatDate(now);        
        this.dateStart = today;
        this.dateEnd = today;
        this.marketplace = 'all';
        this.status = 'aprovado';

        this.getMarketplaces();
        this.getStatuses();
    }

    formatDate(date) {
        function twoDigit(n) { return (n < 10 ? '0' : '') + n; }
        
        return `${twoDigit(date.getDate())}/${twoDigit(date.getMonth() + 1)}/${date.getFullYear()}`;
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
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
    
    filterPage(page){
        this.getOrders(page, 100, this.dateStart, this.dateEnd, this.marketplace, this.status);
    }
    
    filterStatus(statuses){
        this.status = statuses;
        return this.getOrders(1, 100, this.dateStart, this.dateEnd, this.marketplace, statuses);
    }

    filterMarketplace(marketplace){
        this.marketplace = marketplace;
        return this.getOrders(1, 100, this.dateStart, this.dateEnd, marketplace, this.status);
    }

    filterDate(dateEnd) {
        //console.log(new Date(dateEnd));
        this.dateEnd = this.formatDate(new Date(dateEnd));
        return this.getOrders(1, 100, this.dateStart, this.dateEnd, this.marketplace, this.status);
    }

    setDateStart(dateStart) {
        //console.log(new Date(dateStart));
        this.dateStart = this.formatDate(new Date(dateStart));        
    }

    getMarketplaces() {
        let headers = this._headerService.getHeaders();
        this._httpClient.get<any>(this.API_MARKETPLACES, {headers})
        .subscribe(
            (data) => {
                // console.log(data);
                
                this.channels = data;
            },
            (error) => 
            {
                console.error(error.error.message);
            }
        );    
    }

    getStatuses() {
        let headers = this._headerService.getHeaders();
        this._httpClient.get<any>(this.API_STATUSES, {headers})
        .subscribe(
            (data) => {
                console.log(data);
                
                this.statuses = data;
            },
            (error) => 
            {
                console.error(error.error.message);
            }
        );    
    }

    getOrders(page = 1, per_page = 100, start_date = this.dateStart, end_date = this.dateEnd, channel = this.marketplace, statuses = this.status) {
        return new Promise((resolve, reject) => {
            
            let api = `${this.API}?filters[start_date]=${start_date}&filters[end_date]=${end_date}&page=${page}&per_page=${per_page}`;
            
            if(this.marketplace !== 'all') {
                api += `&filters[sale_systems][]=${channel}`;
            }

            if(this.status !== 'all') {
                api += `&filters[statuses][]=${statuses}`;
            }            
            
            let headers = this._headerService.getHeaders();
            
            this._httpClient.get<any>(api, {headers})
            .subscribe(
                (data) => {
                   // console.log(data);
                    
                    this.orders = data.orders;  
                    this.page = page;                  
                    this.pages = Math.ceil(data.total / 100); 
                    this.total = data.total;                   
                    this.onOrdersChanged.next(this.orders);

                    resolve(data.orders);
                },
                (error) => 
                {
                    console.error(error.error.message);
                    
                    reject(error);
                }
            ); 
        });
    }

    searchOrder(CODE) {
        return new Promise((resolve, reject) => {

            let api = `${this.API}/${CODE}`;
            let headers = this._headerService.getHeaders();
            
            return this._httpClient.get<any>(api, {headers})
            .subscribe(
                (data) => {
                    //console.log(data);
                    
                    this.orders = [data];                    
                    this.page = 1;   
                    this.pages = 1;
                    this.total = 1;                   
                    this.onOrdersChanged.next(this.orders);

                    resolve(data.orders);
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