import { Component, inject, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { CurrentBoardService } from '../Services/CurrentBoardService';
import { DominoPieceOne } from './DominoPieceOne';
import { DominoPieceTwo } from './DominoPieceTwo';
import { LevelService } from '../Services/LevelService';
@Component({
    selector: 'domino-pieces',
    template: `
            <!-- @let dom = this.currentBoard(); -->
        <div class="flex flex-row bg-[#ababab] rounded-4xl gap-4 text-2xl pt-6 px-4 items-center">
            <div (click)="onClickPieceOne()" class='cursor-pointer p-2 duration-200' [ngClass]="{'scale-110':levelService.selectedPiece()==1,'opacity-50':levelService.selectedPiece()==2}" >
                <domino-piece-one [currentBoard]="this.currentBoard()" />
            </div>
            <div (click)="onClickPieceTwo()" class='cursor-pointer p-2 duration-200' [ngClass]="{'scale-110':levelService.selectedPiece()==2,'opacity-50':levelService.selectedPiece()==1}" >
                <domino-piece-two [currentBoard]="this.currentBoard()" />
            </div>
        </div >
  `,
    imports: [DominoPieceOne, DominoPieceTwo, NgClass],
})
export class DominoPieces {
    levelService = inject(LevelService)
    currentBoard = input.required<CurrentBoardService>()
    onClickPieceOne = () => {
        this.levelService.setSelectedPiece(1);
    }
    onClickPieceTwo = () => {
        this.levelService.setSelectedPiece(2);
    }
}
