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

import { QuestionsComponent } from 'app/main/apps/asking/questions/questions.component';
import { QuestionsService } from 'app/main/apps/asking/questions/questions.service';

import { QuestionComponent } from 'app/main/apps/asking/question/question.component';
import { QuestionService } from 'app/main/apps/asking/question/question.service';

const routes: Routes = [
    {
        path     : 'questions',
        component: QuestionsComponent,
        resolve  : {
            data: QuestionsService
        }
    },
    {
        path     : 'questions/:code',
        component: QuestionComponent,
        resolve  : {
            data: QuestionService
        }
    },  
];

@NgModule({
    declarations: [
        QuestionComponent,
        QuestionsComponent
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
        QuestionService,
        QuestionsService
    ]
})
export class AskingModule
{
}
