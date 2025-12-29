import { Component, computed, inject, input, signal } from '@angular/core';
import { LevelService } from '../Services/LevelService';
import { NgStyle, NgClass } from '@angular/common';
import { CurrentBoardService } from '../Services/CurrentBoardService';
import { Numbers } from './Numbers';
import { ClientBoard } from "./ClientBoard";
import { SizeService } from '../Services/SizeService';
import { TwMergeDirective } from "../Directives/Highlight";
@Component({
    selector: 'tutorial',
    template: `
    @if(!hasSeen()){
        <div class="absolute w-full h-full top-0 left-0 flex flex-col items-center justify-center z-999">
            <div class="absolute top-0 left-0 right-0 bottom-0 backdrop-blur-sm flex items-center justify-center">
                <div class="bg-white rounded-2xl text-black w-[min(90%,1080px)] p-8 flex items-center justify-center flex-col gap-4">
                    <h2 class="text-3xl font-bold mb-4">Domino Fill Tutorial</h2>
                    <p>Welcome to Domino Fill! The goal of the game is to fill the entire board with domino pieces.</p>
                    <p>Each domino piece covers two adjacent squares on the board.</p>
                    <p>The numbers on the edges of the board indicate how many domino pieces should be placed in that row or column.</p>
                    <p>Use the slider to adjust the difficulty level, which changes the size of the board and the complexity of the puzzle.</p>
                    <p>Right-click to switch between the two types of domino pieces.</p>
                    <p>Click on the board to place a domino.</p>
                    <client-board [currentBoard]="tutorialBoard()" />
                    <button [disabled]="!tutorialBoard().completed()" (click)="setSeenTutorial()"  class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer" [ngClass]="{'opacity-50 cursor-not-allowed':!tutorialBoard().completed()}" twMerge>
                        Got it!
                    </button>
                </div>
            </div>
        </div>
    }
  `,
    imports: [ClientBoard, NgClass, TwMergeDirective],
})
export class Tutorial {
    hasSeen = signal(false)
    constructor() {
        const hasSeen = localStorage.getItem('hasSeenTutorial')
        if (hasSeen === 'true') this.hasSeen = signal(true)
    }
    setSeenTutorial() {
        localStorage.setItem('hasSeenTutorial', 'true')
        this.hasSeen = signal(true)
    }
    levelService = inject(LevelService)
    sizeStore = inject(SizeService)
    tutorialBoard = signal(new CurrentBoardService(this.sizeStore, this.levelService, { board: [[null, null], [null, null]], boardHorizontalNumbers: '11', boardVerticalNumbers: '20', completed: false }))
}
