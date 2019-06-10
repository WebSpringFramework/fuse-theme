import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule, MatChipsModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSnackBarModule,
    MatSortModule,
    MatTableModule, MatTabsModule
} from '@angular/material';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { EcommerceCategoriesComponent } from 'app/main/apps/e-commerce/categories/categories.component';
import { EcommerceCategoriesService } from 'app/main/apps/e-commerce/categories/categories.service';

import { EcommerceProductsComponent } from 'app/main/apps/e-commerce/products/products.component';
import { EcommerceProductsService } from 'app/main/apps/e-commerce/products/products.service';
import { EcommerceProductComponent } from 'app/main/apps/e-commerce/product/product.component';
import { EcommerceProductService } from 'app/main/apps/e-commerce/product/product.service';

import { EcommerceOrdersComponent } from 'app/main/apps/e-commerce/orders/orders.component';
import { EcommerceOrdersService } from 'app/main/apps/e-commerce/orders/orders.service';
import { EcommerceOrderComponent } from 'app/main/apps/e-commerce/order/order.component';
import { EcommerceOrderService } from 'app/main/apps/e-commerce/order/order.service';

import { EcommerceStatusesComponent } from 'app/main/apps/e-commerce/statuses/statuses.component';
import { EcommerceStatusesService } from 'app/main/apps/e-commerce/statuses/statuses.service';
import { EcommerceStatusComponent } from 'app/main/apps/e-commerce/status/status.component';
import { EcommerceStatusService } from 'app/main/apps/e-commerce/status/status.service';

const routes: Routes = [
    {
        path     : 'categories',
        component: EcommerceCategoriesComponent,
        resolve  : {
            data: EcommerceCategoriesService
        }
    },
    {
        path     : 'products',
        component: EcommerceProductsComponent,
        resolve  : {
            data: EcommerceProductsService
        }
    },
    {
        path     : 'products/:sku',
        component: EcommerceProductComponent,
        resolve  : {
            data: EcommerceProductService
        }
    },
    {
        path     : 'orders',
        component: EcommerceOrdersComponent,
        resolve  : {
            data: EcommerceOrdersService
        }
    },
    {
        path     : 'orders/:code',
        component: EcommerceOrderComponent,
        resolve  : {
            data: EcommerceOrderService
        }
    },
    {
        path     : 'statuses',
        component: EcommerceStatusesComponent,
        resolve  : {
            data: EcommerceStatusesService
        }
    },    
    {
        path     : 'statuses/:option',
        component: EcommerceStatusComponent,
        resolve  : {
            data: EcommerceStatusService
        }
    },    
];

@NgModule({
    declarations: [
        EcommerceCategoriesComponent,
        EcommerceProductsComponent,
        EcommerceProductComponent,
        EcommerceOrdersComponent,
        EcommerceOrderComponent,
        EcommerceStatusesComponent,
        EcommerceStatusComponent,
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatChipsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        MatSnackBarModule,
        MatTableModule,
        MatTabsModule,

        NgxChartsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
        }),

        FuseSharedModule,
        FuseWidgetModule
    ],
    providers   : [
        EcommerceCategoriesService,
        EcommerceProductsService,
        EcommerceProductService,
        EcommerceOrdersService,
        EcommerceOrderService,
        EcommerceStatusesService,
        EcommerceStatusService,
    ]
})
export class EcommerceModule
{
}
