import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SizeService } from './Services/SizeService';
import { LevelService } from './Services/LevelService';
import {DominoClient} from './Components/DominoClient'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DominoClient],
  // templateUrl: './app.html',
  // styleUrl: './app.css'
  template: `
  <div class="flex flex-col min-h-screen items-center justify-center bg-[#e8e7e7] font-sans">
      <!-- <DominoClient /> -->
       {{sizeService.boardSize()}}
       <domino-client></domino-client>
    </div >
  `,
})
export class App {
  protected readonly title = signal('DominoNG');
  sizeService = inject(SizeService);
  levelService = inject(LevelService);
}
