import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        icon     : 'apps',
        children : [
            {
                id       : 'dashboards',
                title    : 'Dashboards',
                translate: 'NAV.DASHBOARDS',
                type     : 'collapsable',
                icon     : 'dashboard',
                children : [
                    {
                        id   : 'analytics',
                        title: 'Vendas',
                        type : 'item',
                        url  : '/apps/dashboards/analytics'
                    },
                    {
                        id   : 'project',
                        title: 'Frete',
                        type : 'item',
                        url  : '/apps/dashboards/project'
                    }
                ]
            },
            
            {
                id       : 'e-commerce',
                title    : 'E-Commerce',
                translate: 'NAV.ECOMMERCE',
                type     : 'collapsable',
                icon     : 'shopping_cart',
                children : [                    
                    {
                        id        : 'products',
                        title     : 'Produtos',
                        type      : 'item',
                        url       : '/apps/e-commerce/products',
                        exactMatch: true
                    },
                   
                    {
                        id        : 'orders',
                        title     : 'Pedidos',
                        type      : 'item',
                        url       : '/apps/e-commerce/orders',
                        exactMatch: true
                    },

                    {
                        id        : 'categories',
                        title     : 'Categorias',
                        type      : 'item',
                        url       : '/apps/e-commerce/categories',
                        exactMatch: true
                    },                    

                    {
                        id        : 'statuses',
                        title     : 'Status',
                        type      : 'item',
                        url       : '/apps/e-commerce/statuses',
                        exactMatch: true
                    }
                ]
            },      
            
            {
                id       : 'marketplaces',
                title    : 'Marketplaces',
                translate: 'NAV.MARKETPLACES',
                type     : 'item',
                icon     : 'business_center',
                url      : '/apps/marketplaces',
                exactMatch: true                    
            },                 
            
            {
                id       : 'questions',
                title    : 'Questions',
                translate: 'NAV.QUESTIONS',
                type     : 'item',
                icon     : 'question_answer',
                url       : '/apps/asking/questions',
                exactMatch: true                
            },                
        ]
    }
];
