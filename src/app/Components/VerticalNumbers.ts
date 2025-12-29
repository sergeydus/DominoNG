import { Component, computed, inject, input } from '@angular/core';
import { LevelService } from '../Services/LevelService';
import { NgStyle } from '@angular/common';
import { CurrentBoardService } from '../Services/CurrentBoardService';
import { Numbers } from './Numbers';
@Component({
    selector: 'vertical-numbers',
    template: `
    <div class="flex flex-col text-6xl">
       @for(el of split(); track $index) {
        <numbers [index]="$index" [value]="el" [currentBoard]="currentBoard()" [ngStyle]="{color:this.getColor($index,el)}">{{el}}</numbers>
    }
    </div>
  `,
    imports: [Numbers, NgStyle],
})
export class VerticalNumbers {
    levelService = inject(LevelService)
    currentBoard = input.required<CurrentBoardService>()
    size = computed(() => this.currentBoard().squareSize)
    split = computed(() => this.currentBoard().currentBoard().boardVerticalNumbers.split(''))
    correctIndexes = computed(() => this.currentBoard().correctVerticalValues)
    getColor(index: number, el: string) {
        let color = '#ababab'
        if (this.correctIndexes()[index] == Number(el)) {
            color = '#4bce4b'
        }
        else if (this.correctIndexes()[index] > Number(el)) {
            color = '#ff0000'
        }
        return color
    }
}
