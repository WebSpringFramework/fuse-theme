import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { fuseAnimations } from '@fuse/animations';

import { Status } from 'app/main/apps/e-commerce/status/status.model';
import { EcommerceStatusService } from 'app/main/apps/e-commerce/status/status.service';

@Component({
    selector     : 'e-commerce-status',
    templateUrl  : './status.component.html',
    styleUrls    : ['./status.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class EcommerceStatusComponent implements OnInit, OnDestroy
{
    statusTypes: any;
    
    pageType: string;
    statusForm: FormGroup;

    code: string;
    label: string;
    type: string;

    option: any;

    displayedColumns = ['code', 'name', 'type'];

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {EcommerceStatusService} _ecommerceStatusService
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     */
    constructor(
        private _ecommerceStatusService: EcommerceStatusService,
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _matSnackBar: MatSnackBar,
        private _activatedRoute: ActivatedRoute
    )
    {

        // Set the private defaults
        this._unsubscribeAll = new Subject();

        this.statusTypes = _ecommerceStatusService.statusTypes;
    }

    ngOnInit(): void {
        
        this._activatedRoute.params.subscribe(params => {
            this.option = params.option;
            
            if(params.option === 'new')
            {
                this.pageType = 'new'; 
                this.code = '';
                this.label = '';
                this.type = '';                
            }
            else if (params.option === 'edit')
            {
                this.pageType = 'edit';
                this.code = params.code;
                this.label = params.label;
                this.type = params.type;
            }                                   
        });

     }

    addStatus(): void
    {
        if(this.code === '' || this.label === '' || this.type === '')
        {
            alert('Todos os campos são obrigatórios!');
        }
        else {
            let status = new Status({
                code: this.code,
                label: this.label,
                type: this.type
            });
            
            this._ecommerceStatusService.addStatus(status);
        }
    }

    saveStatus(): void
    {
        if(this.code === '' || this.label === '' || this.type === '')
        {
            alert('Todos os campos são obrigatórios!');
        }
        else {
            let status = new Status({
                code: this.code,
                label: this.label,
                type: this.type
            });
            
            this._ecommerceStatusService.saveStatus(status);
        }
    }

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
