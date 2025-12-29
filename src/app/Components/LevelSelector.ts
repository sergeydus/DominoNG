import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { SizeService } from '../Services/SizeService';
import { LevelService } from '../Services/LevelService';
import { NgClass } from '@angular/common';
@Component({
    selector: 'level-selector',
    template: `
    <div class="flex flex-row">
        <div (click)="onPreviousLevelClick()" [ngClass]="{'grayscale cursor-not-allowed!':!hasPreviousLevel()}" class="rotate-180 cursor-pointer hover:scale-120 transition-all duration-200">
            <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M10 20
       Q8 20 8 22
       V42
       Q8 44 10 44
       H34
       V52
       Q34 56 38 53
       L58 34
       Q60 32 58 30
       L38 11
       Q34 8 34 12
       V20
       Z"
                    fill="#4FC3F7"
                    stroke="#0288D1"
                    strokeWidth="3"
                    strokeLinejoin="round"
                />
            </svg>

        </div>
        <div (click)="onNextLevelClick()" [ngClass]="{'grayscale cursor-not-allowed!':!hasNextLevel()}" class="cursor-pointer hover:scale-120 transition-all duration-200">
            <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M10 20
       Q8 20 8 22
       V42
       Q8 44 10 44
       H34
       V52
       Q34 56 38 53
       L58 34
       Q60 32 58 30
       L38 11
       Q34 8 34 12
       V20
       Z"
                    fill="#4FC3F7"
                    stroke="#0288D1"
                    strokeWidth="3"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    </div >
  `,
    imports: [NgClass],
})
export class LevelSelector {
    sizeService = inject(SizeService)
    levelService = inject(LevelService)
    hasNextLevel = computed(() => {
        return this.levelService.level() < 3
    })
    hasPreviousLevel = computed(() => {
        return this.levelService.level() > 1
    })
    onNextLevelClick() {
        let currentLevel = this.levelService.level()
        if (currentLevel < 3) this.levelService.setLevel(currentLevel + 1 as 1 | 2 | 3)
    }
    onPreviousLevelClick() {
        let currentLevel = this.levelService.level()
        if (currentLevel > 1) this.levelService.setLevel(currentLevel - 1 as 1 | 2 | 3)
    }
}
