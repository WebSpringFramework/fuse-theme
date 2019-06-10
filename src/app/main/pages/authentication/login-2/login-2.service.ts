import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Attribute } from './attribute';
import { environment } from './../../../../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class Login2Service {

    private readonly API = `${environment.baseURL}/attributes`;

    constructor(private http: HttpClient) {}

    login(email, password, key) {
        
        let headers = new HttpHeaders()
        .set('X-User-Email', email)
        .set('X-Api-Key', password)        
        .set('X-Accountmanager-Key', key)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json');        
        
        return this.http.get<Attribute[]>(this.API, {headers})
        .pipe(
            tap(console.log)
        );
    }
}