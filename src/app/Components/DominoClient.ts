import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { SizeService } from '../Services/SizeService';
import { BoardsResponse } from '../types';
import { LevelService } from '../Services/LevelService';
import dominoBoardsData from '../dominoBoards.json';
import { DifficultySlider } from "./DifficultySlider";
import { LevelSelector } from "./LevelSelector";
import { DominoPieces } from "./DominoPieces";
import { ClientBoard } from "./ClientBoard";
import { Tutorial } from "./Tutorial";
@Component({
  selector: 'domino-client',
  template: `
  @let currentboardz = this.currentboard();
@if (!currentboardz) {
    <div>Loading board...</div>
  }@else {

    <div class="flex flex-col min-h-screen items-center justify-center bg-[#e8e7e7] font-sans">
      <div (contextmenu)="onRightClick($event)" class="flex flex-col gap-4 items-center justify-center">
        <difficulty-slider></difficulty-slider>
        <client-board [currentBoard]="currentboardz"></client-board>
        <domino-pieces [currentBoard]="currentboardz"></domino-pieces>
        <level-selector></level-selector>
        <tutorial></tutorial>
      </div>
    </div >
  }
    `,
  imports: [DifficultySlider, LevelSelector, DominoPieces, ClientBoard, Tutorial],
})
export class DominoClient implements OnInit {
  sizeService = inject(SizeService)
  levelService = inject(LevelService)
  title = signal('DominoNG')
  currentboard = computed(() => this.levelService.currentBoard) //this.levelService.currentBoard
  onRightClick(event: Event) {
    const me = event as MouseEvent
    this.levelService.setSelectedPiece(this.levelService.selectedPiece() == 1 ? 2 : 1)
    me.preventDefault()
  }
  ngOnInit() {
    //get mock data from JSON file
    const data: BoardsResponse[] = dominoBoardsData as BoardsResponse[];
    const randomIndex = Math.floor(Math.random() * data.length);
    this.levelService.setBoards(data[randomIndex]);
  }

}
