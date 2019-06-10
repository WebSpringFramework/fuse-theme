import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Login2Service } from './login-2.service';

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

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _service: Login2Service
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
        // this.loginForm = this._formBuilder.group({
        //     email   : ['', [Validators.required, Validators.email]],
        //     password: ['', Validators.required]
        // });

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
        this._service.login(this.form.email.value,this.form.password.value,'xk21bPa9jQ')    
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
