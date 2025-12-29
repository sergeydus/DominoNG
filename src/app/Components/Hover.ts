import { Component, computed, inject, input } from '@angular/core';
import { LevelService } from '../Services/LevelService';
import { NgStyle } from '@angular/common';
import { CurrentBoardService } from '../Services/CurrentBoardService';
@Component({
    selector: 'hover',
    template: `
    @if(this.highlightedSquares() != null) {
        
        <div class="z-10 pointer-events-none absolute opacity-70 bg-white" [ngStyle]="style()">
         
        </div>
    }
  `,
    imports: [NgStyle],
})
export class Hover {
    levelService = inject(LevelService)
    currentBoard = input.required<CurrentBoardService>()
    size = computed(() => this.currentBoard().squareSize)
    split = computed(() => this.currentBoard().currentBoard().boardVerticalNumbers.split(','))
    highlightedSquares = computed(() => {
        const highlightedSquares = this.currentBoard().highlightedSquares2()
        if (!highlightedSquares) {
            return null
        }
        const [[i1, j1], [i2, j2]] = highlightedSquares
        const startI = Math.min(i1, i2)
        const startJ = Math.min(j1, j2)
        return { startI, startJ, i1, j2, i2, j1 }
    })
    style = computed(() => {
        const data = this.highlightedSquares()
        if (!data) {
            return {}
        }
        const { i1, j1, i2, j2, startI, startJ } = data
        return {
            top: `${startI * this.size()}px`,
            left: `${startJ * this.size()}px`,
            height: `${(Math.abs(i1 - i2) + 1) * this.size()}px`,
            width: `${(Math.abs(j1 - j2) + 1) * this.size()}px`,
            'border-bottom-right-radius': '12px',
            'border-top-left-radius': '12px',
            'border-top-right-radius': '12px',
            'border-bottom-left-radius': '12px',
        }
    })
}
