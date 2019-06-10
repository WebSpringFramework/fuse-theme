import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from './../../../../../environments/environment';
import { HeadersService } from '@fuse/services/headers.service';

import { Router } from '@angular/router';

@Injectable()
export class EcommerceStatusService implements Resolve<any>
{
    routeParams: any;
    statusTypes: any;
    onStatusTypesChanged: BehaviorSubject<any>;

    headers: any;

    private readonly API = `${environment.baseURL}`;

    constructor(
        private _httpClient: HttpClient,
        private _headerService: HeadersService,
        private _router: Router
    )
    {
        // Set the defaults
        this.onStatusTypesChanged = new BehaviorSubject({});
        this.headers = this._headerService.getHeaders();
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        this.routeParams = route.params;

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getStatusTypes()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    addStatus(status){
        
        let api = `${this.API}/statuses`;
        let headers = this.headers;

        this._httpClient.post<any>(api,{
            "status": {
              "code": status.code,
              "label": status.label,
              "type": status.type
            }
          }, {headers})
        .subscribe(
            (data) => {
                // console.log(data);
                alert('Status criado com sucesso!');
                this._router.navigate(['apps/e-commerce/statuses']);
            },
            (error) => 
            {
                console.log(error);
            }
        );        
    }

    saveStatus(status){
        
        let api = `${this.API}/statuses/${status.code}`;
        let headers = this.headers;

        this._httpClient.put<any>(api,{
            "status": {
              "label": status.label,
              "type": status.type
            }
          }, {headers})
        .subscribe(
            (data) => {
                // console.log(data);
                alert('Status atualizado com sucesso!');
                this._router.navigate(['apps/e-commerce/statuses']);
            },
            (error) => 
            {
                console.log(error);
            }
        );        
    }

    getStatusTypes() {
        return new Promise((resolve, reject) => {
                      
            let api = `${this.API}/status_types`;          
            let headers = this.headers;
            
            this._httpClient.get<any>(api, {headers})
            .subscribe(
                (data) => {
                    // console.log(data);

                    this.statusTypes = data;
                    this.onStatusTypesChanged.next(this.statusTypes);
                    
                    resolve(data);
                },
                (error) => 
                {
                    console.log(error.error.message);
                    
                    reject(error);
                }
            ); 
        });
    }
}
