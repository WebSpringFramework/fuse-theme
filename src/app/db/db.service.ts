import { InMemoryDbService } from 'angular-in-memory-web-api';

import { ProjectDashboardDb } from 'app/db/dashboard-project';
import { AnalyticsDashboardDb } from 'app/db/dashboard-analytics';
import { ECommerceDb } from 'app/db/e-commerce';
import { QuickPanelFakeDb } from 'app/fake-db/quick-panel';

export class DbService implements InMemoryDbService
{
    createDb(): any
    {
        return {
            // Dashboards
            'project-dashboard-projects' : ProjectDashboardDb.projects,
            'project-dashboard-widgets'  : ProjectDashboardDb.widgets,
            'analytics-dashboard-widgets': AnalyticsDashboardDb.widgets,

            // E-Commerce
            'e-commerce-products' : ECommerceDb.products,
            'e-commerce-orders'   : ECommerceDb.orders,

            // Quick Panel
            'quick-panel-notes' : QuickPanelFakeDb.notes,
            'quick-panel-events': QuickPanelFakeDb.events            
        };
    }
}
