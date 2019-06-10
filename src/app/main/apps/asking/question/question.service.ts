import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from './../../../../../environments/environment';
import { HeadersService } from '@fuse/services/headers.service';

@Injectable()
export class QuestionService implements Resolve<any>
{
    routeParams: any;
    question: any;
    onQuestionChanged: BehaviorSubject<any>;

    private readonly API = `${environment.baseURL}/questions`;

    constructor(
        private _httpClient: HttpClient,
        private _headerService: HeadersService
    )
    {
        // Set the defaults
        this.onQuestionChanged = new BehaviorSubject({});
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        this.routeParams = route.params;

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getQuestion()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getQuestion() {
        return new Promise((resolve, reject) => {
            
            let api = `${this.API}/${this.routeParams.code}`;            
            let headers = this._headerService.getHeaders();
            
            this._httpClient.get<any>(api, {headers})
            .subscribe(
                (data) => {
                    // console.log(data);

                    this.question = data;
                    this.onQuestionChanged.next(this.question);
                    
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
