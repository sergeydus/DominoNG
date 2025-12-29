import { Component, computed, inject, input, OnInit, output, signal } from '@angular/core';
import { SizeService } from '../Services/SizeService';
import { LevelService } from '../Services/LevelService';
import { NgClass, NgStyle } from '@angular/common';
import { CurrentBoardService } from '../Services/CurrentBoardService';
import { Numbers } from './Numbers';
@Component({
    standalone: true,
    selector: 'board-square',
    template: `
    <div class="relative" [ngStyle]="getStyle(i(),j())">
      
    </div>
  `,
    imports: [NgStyle],
})
export class BoardSquare {
    levelService = inject(LevelService)
    i = input.required<number>()
    j = input.required<number>()
    currentBoard = input.required<CurrentBoardService>()
    isDark = computed(() => (this.i() + this.j()) % 2 == 0)
    color = computed(() => {
        // if (this.isRock()) return '#000000'
        return this.isDark() ? '#cbcbcb' : '#ababab'
    })
    size = computed(() => this.currentBoard().squareSize)
    boardSize = computed(()=> this.currentBoard().currentBoard().board.length)
    isRock = computed(() => this.currentBoard().currentBoard().board[this.i()][this.j()] == -1)
    squareStyle = computed(() => {
        return {
            'aspect-ratio': 1,
            height: `${this.size()}px`,
            width: `${this.size()}px`,
            'background-color': this.color()
        }
    })
    getCornerStyle(i: number, j: number) {
        if (i === 0 && j === 0) return { 'border-top-left-radius': '12px' }
        if (i === 0 && j === this.boardSize() - 1) return { 'border-top-right-radius': '12px' }
        if (i === this.boardSize() - 1 && j === 0) return { 'border-bottom-left-radius': '12px' }
        if (i === this.boardSize() - 1 && j === this.boardSize() - 1) return { 'border-bottom-right-radius': '12px' }
        return {}
    }
    getStyle(i: number, j: number) {
        return { ...this.squareStyle(), ...this.getCornerStyle(i, j) }
    }
}
