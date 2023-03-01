import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    template: ''
})

export class Base implements OnDestroy {

    destroy$: Subject<void> = new Subject();

    ngOnDestroy(): void  {
        this.destroy$.next();
        this.destroy$.complete();
    }
}