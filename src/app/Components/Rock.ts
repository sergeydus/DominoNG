import { Component, computed, inject, input, OnInit, output, signal } from '@angular/core';
import { LevelService } from '../Services/LevelService';
import { CurrentBoardService } from '../Services/CurrentBoardService';
@Component({
    selector: 'rock',
    template: `
            <svg [attr.width]="size()" [attr.height]="size() + 16" class="-translate-y-4">
            <rect [attr.x]="strokeWidth" [attr.y]="strokeWidth + 16" [attr.width]="size() - (strokeWidth * 2)" [attr.height]="size() - strokeWidth * 2" fill="#656565" rx="8" ry="8" />
            <rect [attr.x]="strokeWidth" [attr.y]="strokeWidth" [attr.width]="size() - (strokeWidth * 2)" [attr.height]="size() - strokeWidth * 2" fill="#868686" rx="8" ry="8" />
            <rect [attr.x]="strokeWidth" [attr.y]="strokeWidth" [attr.width]="size() - (strokeWidth * 2)" [attr.height]="size() - (strokeWidth * 2) + 16" fill="transparent" stroke-width="6" stroke="black" rx="8" ry="8" />
        </svg>
  `,
})
export class Rock {
    strokeWidth = 6
    levelService = inject(LevelService)
    currentBoard = input.required<CurrentBoardService>()
    size = computed(() => this.currentBoard().squareSize)
}
