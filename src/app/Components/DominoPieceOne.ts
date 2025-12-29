import { Component, computed, inject, input, output } from '@angular/core';
import { LevelService } from '../Services/LevelService';
import { CurrentBoardService } from '../Services/CurrentBoardService';
@Component({
    selector: 'domino-piece-one',
    template: `
            <svg (click)="click.emit()" [attr.width]="size()" [attr.height]="(size() * 2) + 16" class="-translate-y-4">
            <rect [attr.width]="size() - (strokeWidth * 2)" [attr.x]="strokeWidth" [attr.y]="20" [attr.height]="size() * 2 - strokeWidth" fill="#8d8778" [attr.stroke-width]="strokeWidth" rx="8" ry="8" />
            <rect [attr.width]="size() - (strokeWidth * 2)" [attr.x]="strokeWidth" [attr.y]="4" [attr.height]="size() * 2 - strokeWidth" fill="#FFF3D6" [attr.stroke-width]="strokeWidth" rx="8" ry="8" />
            <rect [attr.width]="size() - (strokeWidth * 2) + 4" [attr.x]="4" [attr.y]="4" [attr.height]="size() * 2 - strokeWidth + 16" stroke="black" fill="transparent" [attr.stroke-width]="6" rx="8" ry="8" />
            <line [attr.x1]="16" [attr.y1]="size()" [attr.x2]="size() - 16" [attr.y2]="size()" stroke="black" [attr.stroke-width]="3" />
            <circle [attr.cx]="size() / 2" [attr.cy]="size() / 2" fill="black" r="8" />
        </svg>
  `,
})
export class DominoPieceOne {
    strokeWidth = 6
    levelService = inject(LevelService)
    currentBoard = input.required<CurrentBoardService>()
    size = computed(() => this.currentBoard().squareSize)
    click = output<void>()
}
