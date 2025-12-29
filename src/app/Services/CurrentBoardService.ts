import { computed, effect, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { DominoLevel } from '../types';
import { SizeService } from './SizeService';
import { LevelService } from './LevelService';

export class CurrentBoardService {
    currentBoard: WritableSignal<DominoLevel>
    sizeStore: SizeService
    levelStore: LevelService
    constructor(sizeStore: SizeService, levelStore: LevelService, currentBoard: DominoLevel) {
        this.sizeStore = sizeStore
        this.levelStore = levelStore
        this.currentBoard = signal(currentBoard)
    }
    get correctHorizontalValues() {
        const correctIndexes = this.currentBoard().board.map((arr, index) => {
            let sum = 0
            for (let i = 0; i < arr.length; i++) {
                const cur = this.currentBoard().board[i][index]
                if (cur == -1) {
                    continue
                }
                sum += (cur || 0)
            }

            return sum
        })
        return correctIndexes
    }
    get correctVerticalValues() {
        return this.currentBoard().board.map((arr) => {
            const sum = arr.reduce<number>((acc, cur) => {
                if (cur == -1) {
                    return acc
                }
                return (acc || 0) + (cur || 0)
            }, 0)
            return sum
        })
    }
    get squareSize() {
        const boardWidth = this.sizeStore.boardSize()
        switch (this.currentBoard().board.length) {
            case 6:
                return Math.round(boardWidth / 8)
            case 7:
                return Math.round(boardWidth / 9)
            case 8:
                return Math.round(boardWidth / 10)
            default:
                return 96
        }
    }
    highlightedSquares2 = computed(() => {
        const hoverCords = this.sizeStore.hoverCords()
        if (!hoverCords) {
            return null
        }
        const selectedPiece = this.levelStore.selectedPiece
        if (!selectedPiece) {
            return null
        }
        const size = this.squareSize
        const [x, y] = hoverCords
        const i = Math.floor(y / size)
        const j = Math.floor(x / size)
        const boardSize = this.currentBoard().board.length
        // if hover is outside of board, ignore, if hover is on rock, ignore
        if ((i < 0 || j < 0) || (i >= boardSize || j >= boardSize) || this.currentBoard().board[i][j] != null) {
            return null
        }
        if (selectedPiece() == 1) {
            // const floor = Math.floor(y)
            const isAboveHalf = y % size > (size / 2)
            if (isAboveHalf) {
                if (i + 1 < this.currentBoard().board.length && this.currentBoard().board[i + 1][j] == null) {
                    return [[i, j], [i + 1, j]]
                }
                else if (i - 1 >= 0 && this.currentBoard().board[i - 1][j] == null) {
                    return [[i, j], [i - 1, j]]
                }
            } else {
                if (i - 1 >= 0 && this.currentBoard().board[i - 1][j] == null) {
                    return [[i, j], [i - 1, j]]
                }
                else if (i + 1 < this.currentBoard().board.length && this.currentBoard().board[i + 1][j] == null) {
                    return [[i, j], [i + 1, j]]
                }
            }
        }
        if (selectedPiece() == 2) {
            const isLeftHalf = x % size > (size / 2)
            if (isLeftHalf) {
                if (j + 1 < this.currentBoard().board.length && this.currentBoard().board[i][j + 1] == null) {
                    return [[i, j], [i, j + 1]]
                }
                else if (j - 1 >= 0 && this.currentBoard().board[i][j - 1] == null) {
                    return [[i, j], [i, j - 1]]
                }
            } else {
                if (j - 1 >= 0 && this.currentBoard().board[i][j - 1] == null) {
                    return [[i, j], [i, j - 1]]
                }
                else if (j + 1 < this.currentBoard().board.length && this.currentBoard().board[i][j + 1] == null) {
                    return [[i, j], [i, j + 1]]
                }
            }

        }
        return null
    })
    setPieceOnBoard() {
        const highlightedSquares2 = this.highlightedSquares2()
        const selectedPiece = this.levelStore.selectedPiece
        if (!highlightedSquares2 || !this.currentBoard().board || !selectedPiece) {
            return
        }
        const [[i, j], [i2, j2]] = highlightedSquares2
        if (this.currentBoard().board[i][j] != null) {
            return
        }
        if (selectedPiece() == 1) {
            if (i > i2) {
                this.currentBoard().board[i2][j2] = 1
                this.currentBoard().board[i][j] = 0
            } else {
                this.currentBoard().board[i][j] = 1
                this.currentBoard().board[i2][j2] = 0
            }
        }
        else if (selectedPiece() == 2) {
            if (j > j2) {
                this.currentBoard().board[i2][j2] = 0
                this.currentBoard().board[i][j] = 2
            } else {
                this.currentBoard().board[i][j] = 0
                this.currentBoard().board[i2][j2] = 2
            }
        }
        const prevComplete = this.completed()
        this.currentBoard.set({ ...this.currentBoard() })
        const nextComplete = this.completed()
        if (!prevComplete && nextComplete) {
            const audio = new Audio('winSilent.mp3')
            audio.play();
        }
    }
    removePiece(i: number, j: number) {
        const value = this.currentBoard().board[i][j]
        if (value === null) return
        if (value == 1) {
            this.currentBoard().board[i][j] = null
            this.currentBoard().board[i + 1][j] = null

        } else {
            this.currentBoard().board[i][j] = null
            this.currentBoard().board[i][j - 1] = null
        }
        this.currentBoard.set({ ...this.currentBoard() })
    }
    completed = computed(() => {
        return this.currentBoard() && this.correctHorizontalValues?.join('') == this.currentBoard().boardHorizontalNumbers
            && this.correctVerticalValues?.join('') == this.currentBoard().boardVerticalNumbers
    })
}