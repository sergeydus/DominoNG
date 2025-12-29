import { Component, computed, inject, input, output } from '@angular/core';
import { LevelService } from '../Services/LevelService';
import { CurrentBoardService } from '../Services/CurrentBoardService';
@Component({
    selector: 'domino-piece-two',
    template: `
            <svg (click)="click.emit()" [attr.width]="size() * 2" [attr.height]="size() + 16" class="-translate-y-4">
            <rect [attr.width]="size() * 2 - 8" [attr.x]="4" [attr.y]="4 + 16" [attr.height]="size() - 8" fill="#8d8778" [attr.stroke-width]="strokeWidth" rx="8" ry="8" />
            <rect [attr.width]="size() * 2 - 8" [attr.x]="4" [attr.y]="4" [attr.height]="size() - 8" fill="#FFF3D6" [attr.stroke-width]="strokeWidth" rx="8" ry="8" />
            <rect [attr.width]="size() * 2 - 8" [attr.x]="4" [attr.y]="4" [attr.height]="size() - 8 + 16" stroke="black" fill="transparent" [attr.stroke-width]="strokeWidth" rx="8" ry="8" />
            <line [attr.x1]="size()" [attr.y1]="16" [attr.x2]="size()" [attr.y2]="size() - 16" stroke="black" [attr.stroke-width]="3" />
            <circle [attr.cx]="size() + size() / 3" [attr.cy]="size() / 3" fill="black" r="8" />
            <circle [attr.cx]="size() + size() * 2 / 3" [attr.cy]="size() * 2 / 3" fill="black" r="8" />
        </svg>
  `,
})
export class DominoPieceTwo {
    strokeWidth = 6
    levelService = inject(LevelService)
    currentBoard = input.required<CurrentBoardService>()
    size = computed(() => this.currentBoard().squareSize)
    click = output<void>()
}
