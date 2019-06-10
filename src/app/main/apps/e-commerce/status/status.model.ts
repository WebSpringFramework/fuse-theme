import { MatChipInputEvent } from '@angular/material';

import { FuseUtils } from '@fuse/utils';

export class Status
{
    code: string;
    label: string;
    type: string;

    constructor(status?)
    {
        status = status || {};
        this.code = status.code || '';
        this.label = status.label || '';
        this.type = status.type || '';
    }
}
