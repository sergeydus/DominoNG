import { Component, computed, effect, inject, input, OnInit, output, signal } from '@angular/core';
import { LevelService } from '../Services/LevelService';
import { CurrentBoardService } from '../Services/CurrentBoardService';
import { NgClass, NgStyle } from '@angular/common';
import { SizeService } from '../Services/SizeService';
import { HorizontalNumbers } from "./HorizontalNumbers";
import { VerticalNumbers } from "./VerticalNumbers";
import { BoardSquare } from "./BoardSquare";
import { Hover } from './Hover';
import { Pieces } from "./Pieces";
@Component({
    selector: 'client-board',
    template: `
    <div class="flex flex-row items-center justify-center select-none" [ngClass]="{'pointer-events-none':isDisabled()}">
        <div class="flex flex-1 flex-col items-center justify-center" [ngStyle]="{width:sizeService.boardSize()+'px'}">
        <horizontal-numbers [currentBoard]="currentBoard()"></horizontal-numbers>
            <div class="flex flex-row">
            <vertical-numbers [currentBoard]="currentBoard()"></vertical-numbers>
            <div class="border-[#666666] border-4 rounded-2xl relative">
                <hover [currentBoard]="currentBoard()"></hover>
                <pieces [currentBoard]="currentBoard()"></pieces>
                <div (mousemove)="onMouseMove($event)" (mouseleave)="onMouseMoveEnd($event)" (click)="onClick($event)" [attr.draggable]="false" [ngStyle]="{display:'grid','grid-template-columns':gridColumns()}">
                    @for(item of currentBoard().currentBoard().board.flat(); track $index) {
                        @let i = calcI($index);
                        @let j = $index % boardSize();
                        <!-- <div>yellow!</div> -->
                        <board-square [currentBoard]="currentBoard()" [i]="i" [j]="j"></board-square>
                    }
                </div>    
            </div>
            <vertical-numbers [currentBoard]="currentBoard()"></vertical-numbers>
            </div>  
        </div>
    </div>
  `,
    imports: [NgClass, NgStyle, HorizontalNumbers, VerticalNumbers, BoardSquare, Hover, Pieces],
})
export class ClientBoard {
    strokeWidth = 6
    constructor() {
        effect(() => {
            if (this.currentBoard().completed()) {
                
            }
        })
    }

    levelService = inject(LevelService)
    sizeService = inject(SizeService)
    currentBoard = input.required<CurrentBoardService>()
    size = computed(() => this.currentBoard().squareSize)
    isDisabled = computed(() => this.currentBoard().completed())
    boardSize = computed(() => this.currentBoard().currentBoard().board.length)
    onMouseMove = (event: MouseEvent) => {
        const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
        const x = event.clientX - rect.left; //x position within the element.
        const y = event.clientY - rect.top;  //y position within the element.
        this.sizeService.setHoverCords([x, y])
    }
    onMouseMoveEnd = (event: MouseEvent) => {
        this.sizeService.setHoverCords(null)

    }
    onClick = (event: MouseEvent) => {
        const audio = new Audio('snap.mp3');
        audio.play();
        this.currentBoard().setPieceOnBoard()
    }
    gridColumns = computed(() => `repeat(${this.boardSize()}, 0fr)`)
    calcI = (x: number) => Math.floor(x / this.boardSize())
}
