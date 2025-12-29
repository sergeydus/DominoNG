import { effect, inject, Injectable, signal } from "@angular/core"
import { DominoLevel } from "../types"
import { CurrentBoardService } from "./CurrentBoardService"
import { BoardsResponse } from "../types"
import { SizeService } from "./SizeService"
import { toObservable } from "@angular/core/rxjs-interop"
import { map, scan } from "rxjs"
import previousValueMap from "../Pipes/previousValueMap"
@Injectable({ providedIn: 'root' })
export class LevelService {
    sizeStore = inject(SizeService)
    difficulty = signal<'easy' | 'normal' | 'hard'>('easy')
    level = signal<1 | 2 | 3>(1)
    selectedPiece = signal<1 | 2>(1)
    difficulty$ = toObservable(this.difficulty)
    tutorial: DominoLevel = { board: [[null, null], [null, null]], boardHorizontalNumbers: '11', boardVerticalNumbers: '20', completed: false }
    easyBoards: DominoLevel[] | null = null
    mediumBoards: DominoLevel[] | null = null
    hardBoards: DominoLevel[] | null = null
    hasBegan: boolean = false
    hasSeenTutorial: boolean = false
    constructor() {
        let audio: HTMLAudioElement | null = null
        if (typeof Audio != 'undefined') {
            audio = new Audio('winSilent.mp3')
        }
        // if (typeof window !== 'undefined') {
        //     this.boardWidth = window.innerWidth < 768 ? window.innerWidth : this.boardWidth
        // }
        if (typeof localStorage !== 'undefined') {
            this.hasSeenTutorial = localStorage.getItem('hasSeenTutorial') === 'true'
        }
        this.difficulty$.pipe(map(previousValueMap())).subscribe((el) => {
            const newDifficulty = el.current
            let boards: DominoLevel[] | null = null
            switch (newDifficulty) {
                case 'easy':
                    boards = this.easyBoards
                    break;
                case 'normal':
                    boards = this.mediumBoards
                    break;
                case 'hard':
                    boards = this.hardBoards
                    break;

                default:
                    boards = this.easyBoards
                    break;
            }
            if (!boards) {
                return
            }
            const index = boards.findIndex(el => !el.completed)
            if (index != -1) {
                this.setLevel((index + 1) as 1 | 2 | 3)
            } else {
                this.setLevel(3)
            }
        })
    }
    setBoards(boards: BoardsResponse) {
        this.easyBoards = boards.easyBoards
        this.mediumBoards = boards.mediumBoards
        this.hardBoards = boards.hardBoards
    }
    setHasSeenTutorial(seen: boolean) {
        this.hasSeenTutorial = seen
    }
    setLevel(level: 1 | 2 | 3) { this.level.set(level) }
    setDifficulty(dif: 'easy' | 'normal' | 'hard') { this.difficulty.set(dif) }
    setSelectedPiece(piece: 1 | 2) { this.selectedPiece.set(piece) }
    get currentBoard() {
        let board: DominoLevel | null = null
        if (!this.easyBoards || !this.mediumBoards || !this.hardBoards) {
            return null
        }
        // if (!this.hasSeenTutorial) {
        //     return new CurrentBoardStore(this.tutorial, this.rootStore)
        // }
        switch (this.difficulty()) {
            case 'easy': board = this.easyBoards[this.level() - 1]; break;
            case 'normal': board = this.mediumBoards[this.level() - 1]; break;
            case 'hard': board = this.hardBoards[this.level() - 1]; break;
            default: board = this.easyBoards[this.level() - 1];
        }
        return new CurrentBoardService(this.sizeStore, this, board)
    }
    get correctHorizontalValues() {
        return this.currentBoard?.correctHorizontalValues
    }
    get correctVerticalValues() {
        return this.currentBoard?.correctVerticalValues
    }
}