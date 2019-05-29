import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector     : 'login-2',
    templateUrl  : './login-2.component.html',
    styleUrls    : ['./login-2.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class Login2Component implements OnInit
{
    loginForm: FormGroup;
    HttpErrorResponse: string;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     * @param {HttpClient} _httpClient
     * @param {Router} _router
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _httpClient: HttpClient,
        private _router: Router
    )
    {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.loginForm = this._formBuilder.group({
            email   : ['comercial@belamaga.com', [Validators.required, Validators.email]],
            password: ['fb1dvh8kDczgvU7QQnXK', Validators.required]
        });

        if(sessionStorage.getItem('ACCESS_EMAIL') && sessionStorage.getItem('ACCESS_PASSW'))
        {
            this._router.navigate(['apps/dashboards/analytics']);
        }
    }

    get form() { return this.loginForm.controls; }

    login(): void
    {        
        let headers = new HttpHeaders()
        .set('X-User-Email', this.form.email.value)
        .set('X-Api-Key', this.form.password.value)        
        .set('X-Accountmanager-Key', 'xk21bPa9jQ')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json');

        this._httpClient.get('https://api.skyhub.com.br/attributes/', {headers})
        .subscribe(
            (data) => {
                // console.log('success', data);
                sessionStorage.setItem('ACCESS_EMAIL', this.form.email.value);
                sessionStorage.setItem('ACCESS_PASSW', this.form.password.value);
                this._router.navigate(['apps/dashboards/analytics']);
            },
            (error) => 
            {
                this.HttpErrorResponse = error.error.message;
                // console.log('oops', error);
                sessionStorage.removeItem('ACCESS_EMAIL');
                sessionStorage.removeItem('ACCESS_PASSW');
            }
        );          
    }
}
