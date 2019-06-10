import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject} from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';

import { QuestionService } from 'app/main/apps/asking/question/question.service';

@Component({
    selector     : 'question',
    templateUrl  : './question.component.html',
    styleUrls    : ['./question.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class QuestionComponent implements OnInit, OnDestroy
{
    question: any;
    questionStatuses: any;
    statusForm: FormGroup;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {QuestionService} _questionService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _questionService: QuestionService,
        private _formBuilder: FormBuilder
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Subscribe to update question on changes
        this._questionService.onQuestionChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(question => {
                this.question = question;
            });

        this.statusForm = this._formBuilder.group({
            newStatus: ['']
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
