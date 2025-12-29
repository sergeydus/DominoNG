import { Component, inject, OnInit, signal } from '@angular/core';
import { SizeService } from '../Services/SizeService';
import { LevelService } from '../Services/LevelService';
import { NgClass } from '@angular/common';
@Component({
    selector: 'difficulty-slider',
    template: `
    <div class="flex flex-row bg-[#ababab] rounded gap-2 text-2xl p-2">
            <button class="cursor-pointer p-2 rounded"
            [ngClass]="{'bg-[#419dc8]':levelService.difficulty()=='easy'}"
                (click)="onClick('easy')">
                Easy 6x6
            </button>
            <button class="cursor-pointer p-2 rounded"
                        [ngClass]="{'bg-[#419dc8]':levelService.difficulty()=='normal'}"

                (click)="onClick('normal')">
                Medium 7x7
            </button>
            <button class="cursor-pointer p-2 rounded"
                        [ngClass]="{'bg-[#419dc8]':levelService.difficulty()=='hard'}"
                (click)="onClick('hard')">
                Hard 8x8
            </button>
        </div >
  `,
    imports: [NgClass],
})
export class DifficultySlider {
    sizeService = inject(SizeService)
    levelService = inject(LevelService)
    onClick(difficulty: 'easy' | 'normal' | 'hard') {
        this.levelService.setDifficulty(difficulty)
    }
}
