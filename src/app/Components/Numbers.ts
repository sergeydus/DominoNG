import { Component, computed, inject, input, OnInit, output, signal } from '@angular/core';
import { SizeService } from '../Services/SizeService';
import { LevelService } from '../Services/LevelService';
import { NgClass, NgStyle } from '@angular/common';
import { CurrentBoardService } from '../Services/CurrentBoardService';
@Component({
    selector: 'numbers',
    template: `
    <div class="flex items-center justify-center" [ngStyle]="{width:size()+'px',height:size()+'px'}">
        <ng-content></ng-content>
    </div>
  `,
    imports: [NgStyle],
})
export class Numbers {
    levelService = inject(LevelService)
    currentBoard = input.required<CurrentBoardService>()
    size = computed(() => this.currentBoard().squareSize)
    split = computed(() => this.currentBoard().currentBoard().boardHorizontalNumbers.split(''))
    correctIndexes = computed(() => this.currentBoard().correctHorizontalValues)
    index = input.required<number>()
    value = input.required<string>()
    color = computed(() => {
        const index = this.index();
        const value = this.value();
        let color = '#ababab';
        if (this.correctIndexes()[index] == Number(value)) {
            color = '#00ff00';
        }
        else if (this.correctIndexes()[index] > Number(value)) {
            color = '#ff0000';
        }
        return color;
    })
}
