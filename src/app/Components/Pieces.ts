import { Component, computed, inject, input, output } from '@angular/core';
import { LevelService } from '../Services/LevelService';
import { NgStyle } from '@angular/common';
import { CurrentBoardService } from '../Services/CurrentBoardService';
import { Rock } from "./Rock";
import { DominoPieceOne } from "./DominoPieceOne";
import { DominoPieceTwo } from "./DominoPieceTwo";
@Component({
    selector: 'pieces',
    styleUrls: ['enter.css'],
    template: `
    <div class="absolute z-20">
        @let ones = this.pieces().ones;
        @let twos = this.pieces().twos;
        @let rocks = this.pieces().rocks;
        @for(item of ones; track item.toString()) {
            @let i = item[0];
            @let j = item[1];
            <div (click)="onclick(i,j)" class="enter absolute cursor-pointer enter-animation" [ngStyle]="{top:i*size()+'px', left:j*size()+ 'px','z-index':30+i}">
                <domino-piece-one  [currentBoard]="currentBoard()"></domino-piece-one>
            </div>
        }
        @for(item of twos; track item.toString()) {
            @let i = item[0];
            @let j = item[1];
            <div (click)="onclick(i,j)" class="absolute cursor-pointer enter-animation" [ngStyle]="{top:i*size()+'px', left:(j-1)*size()+ 'px','z-index':30+i}">
                <domino-piece-two  [currentBoard]="currentBoard()"></domino-piece-two>
            </div>
        }
        @for(item of rocks; track item.toString()) {
            @let i = item[0];
            @let j = item[1];
            <div class="absolute" [ngStyle]="{top:i*size()+'px', left:j*size()+ 'px','z-index':30+i}">
                <rock  [currentBoard]="currentBoard()"></rock>
            </div>
        }
    </div>
  `,
    imports: [Rock, DominoPieceOne, DominoPieceTwo, NgStyle],
})
export class Pieces {
    levelService = inject(LevelService)
    currentBoard = input.required<CurrentBoardService>()
    size = computed(() => this.currentBoard().squareSize)
    click = output<void>()
    pieces = computed(() => {
        const ones: [number, number][] = []
        const twos: [number, number][] = []
        const rocks: [number, number][] = []
        const board = this.currentBoard().currentBoard().board
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] === 1) ones.push([i, j])
                if (board[i][j] === 2) twos.push([i, j])
                if (board[i][j] === -1) rocks.push([i, j])
            }
        }
        return {
            ones,
            twos,
            rocks
        }
    })
    onclick(i: number, j: number) {
        this.currentBoard().removePiece(i, j)
    }
}
