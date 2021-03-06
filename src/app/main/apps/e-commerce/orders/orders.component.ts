import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, merge, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { EcommerceOrdersService } from 'app/main/apps/e-commerce/orders/orders.service';

@Component({
    selector     : 'e-commerce-orders',
    templateUrl  : './orders.component.html',
    styleUrls    : ['./orders.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class EcommerceOrdersComponent implements OnInit, OnDestroy
{
    dateStart: any;
    dateEnd: any;
    statuses: any;
    channels: any;
    CODE = '';
    page: any;
    pages: any;
    total: any;
    dataSource: FilesDataSource | null;
    displayedColumns = ['code', 'total', 'date', 'marketplace', 'status'];
    selectedStatus: any;

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild('filter')
    filter: ElementRef;

    @ViewChild(MatSort)
    sort: MatSort;


    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {EcommerceOrdersService} _ecommerceOrdersService
     */
    constructor(
        private _ecommerceOrdersService: EcommerceOrdersService
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();

        this.channels = this._ecommerceOrdersService.channels;

        this.statuses = this._ecommerceOrdersService.statuses;        

        this.dateStart = this.formatDate(new Date(this._ecommerceOrdersService.dateStart));
        
        this.dateEnd = this.formatDate(new Date(this._ecommerceOrdersService.dateEnd));

        this.selectedStatus = this._ecommerceOrdersService.status;
    }

    formatDate(date) {
        function twoDigit(n) { return (n < 10 ? '0' : '') + n; }
        
        return `${date.getFullYear()}-${twoDigit(date.getDate())}-${twoDigit(date.getMonth() + 1)}`;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {        
        this.dataSource = new FilesDataSource(this._ecommerceOrdersService, this.sort);
        
        this.reloadPagination();
    }

    reloadPagination(){
        this.page = this._ecommerceOrdersService.page;
        this.pages = this._ecommerceOrdersService.pages;
        this.total = this._ecommerceOrdersService.total;
    }

    searchOrderCODE(): void {
        this._ecommerceOrdersService.searchOrder(this.CODE).then(() => {
            this.reloadPagination();
        });
    }

    filterProductsPage(event): any {
        this._ecommerceOrdersService.filterPage(event.target.value).then(() => {
            this.reloadPagination();
        });      
    }  
    
    filterProductsStatus(event): any {
        this._ecommerceOrdersService.filterStatus(event.target.value).then(() => {
            this.reloadPagination();
        });
    }

    filterProductsMarketplaces(event): any {
        this._ecommerceOrdersService.filterMarketplace(event.target.value).then(() => {
            this.reloadPagination();
        });
    }

    filterProductsDateStart(event): any {
        // console.log('component.ts DateStart',event.target.value);
        this._ecommerceOrdersService.setDateStart(event.target.value);
    }
    
    filterProductsDateEnd(event): any {
        // console.log('component.ts DateEnd',event.target.value);
        this._ecommerceOrdersService.filterDate(event.target.value).then(() => {
            this.reloadPagination();
        });
    }

    prevPage(): void {
        let p = this.page - 1;
        this._ecommerceOrdersService.getOrders(p).then(() => {
            this.reloadPagination();
        });
    }

    nextPage(): void {
        let p = this.page + 1;
        this._ecommerceOrdersService.getOrders(p).then(() => {
            this.reloadPagination();
        });
    }

    firstPage(): void {
        this._ecommerceOrdersService.getOrders(1).then(() => {
            this.reloadPagination();
        });
    }

    lastPage(): void {
        this._ecommerceOrdersService.getOrders(this.pages).then(() => {
            this.reloadPagination();
        });
    }    

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}

export class FilesDataSource extends DataSource<any>
{
    private _filterChange = new BehaviorSubject('');
    private _filteredDataChange = new BehaviorSubject('');

    constructor(
        private _ecommerceOrdersService: EcommerceOrdersService,
        // private _matPaginator: MatPaginator,
        private _matSort: MatSort
    )
    {
        super();

        this.filteredData = this._ecommerceOrdersService.orders;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // Filtered data
    get filteredData(): any
    {
        return this._filteredDataChange.value;
    }

    set filteredData(value: any)
    {
        this._filteredDataChange.next(value);
    }

    // Filter
    get filter(): string
    {
        return this._filterChange.value;
    }

    set filter(filter: string)
    {
        this._filterChange.next(filter);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
        const displayDataChanges = [
            this._ecommerceOrdersService.onOrdersChanged,
            // this._matPaginator.page,
            this._filterChange,
            this._matSort.sortChange
        ];

        return merge(...displayDataChanges).pipe(map(() => {

                let data = this._ecommerceOrdersService.orders.slice();

                data = this.filterData(data);

                this.filteredData = [...data];

                data = this.sortData(data);

                return data;

                // Grab the page's slice of data.
                // const startIndex = this._matPaginator.pageIndex * this._matPaginator.pageSize;
                // return data.splice(startIndex, this._matPaginator.pageSize);
            })
        );

    }

    /**
     * Filter data
     *
     * @param data
     * @returns {any}
     */
    filterData(data): any
    {
        if ( !this.filter )
        {
            return data;
        }
        return FuseUtils.filterArrayByString(data, this.filter);
    }

    /**
     * Sort data
     *
     * @param data
     * @returns {any[]}
     */
    sortData(data): any[]
    {
        if ( !this._matSort.active || this._matSort.direction === '' )
        {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch ( this._matSort.active )
            {
                case 'code':
                    [propertyA, propertyB] = [a.code, b.code];
                    break;
                case 'customer':
                    [propertyA, propertyB] = [a.customer.name, b.customer.name];
                    break;
                case 'total':
                    [propertyA, propertyB] = [a.total_ordered, b.total_ordered];
                    break;
                case 'marketplace':
                    [propertyA, propertyB] = [a.channel, b.channel];
                    break;
                case 'date':
                    [propertyA, propertyB] = [a.updated_at, b.updated_at];
                    break;
            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this._matSort.direction === 'asc' ? 1 : -1);
        });
    }

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }
}
export interface SatDatepickerRangeValue<D> {
    begin: D | null;
    end: D | null;
  }
