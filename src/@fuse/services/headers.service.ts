import { Injectable } from "@angular/core";
import { HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HeadersService {

    private readonly key = environment.key;

    getHeaders(){
        let email = sessionStorage.getItem('ACCESS_EMAIL');
        let passw = sessionStorage.getItem('ACCESS_PASSW');
        
        return new HttpHeaders()
        .set('X-User-Email', email)
        .set('X-Api-Key', passw)        
        .set('X-Accountmanager-Key', this.key)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json');
    }
 
}