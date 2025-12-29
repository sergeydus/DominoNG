import { Directive, ElementRef, inject, Input, input, OnChanges, effect } from '@angular/core';
import clsx from 'clsx';
import { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

@Directive({
    selector: '[twMerge]',
})
export class TwMergeDirective {
    private el = inject(ElementRef);
    ngClass = input<Record<string, boolean>>()
    class = input<string>()
    // @Input() ngClass: Record<string, boolean>|null= null;
    constructor() {
        // this.el.nativeElement.style.backgroundColor = 'yellow';
        effect(() => {
            // this.el.nativeElement
            this.el.nativeElement.setAttribute('class', cn(this.class(), this.ngClass()));
        });
    }
}