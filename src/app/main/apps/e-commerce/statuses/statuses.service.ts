import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from './../../../../../environments/environment';
import { HeadersService } from '@fuse/services/headers.service';

@Injectable()
export class EcommerceStatusesService implements Resolve<any> {

    pages: any;
    statuses: any[];
    onStatusesChanged: BehaviorSubject<any>;

    private readonly API = `${environment.baseURL}/statuses`;

    constructor(private _httpClient: HttpClient, private _headerService: HeadersService) {
        this.onStatusesChanged = new BehaviorSubject({});
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getStatuses()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }  

    getStatuses(page = 1, per_page = 100) {
        return new Promise((resolve, reject) => {
            
            let api = `${this.API}?page=${page}&per_page=${per_page}`;
            let headers = this._headerService.getHeaders();
            
            this._httpClient.get<any>(api, {headers})
            .subscribe(
                (data) => {
                    // console.log(data);
                    
                    this.statuses = data;
                    this.pages = Math.ceil(data.length / 100);                    
                    this.onStatusesChanged.next(this.statuses);

                    resolve(data);
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