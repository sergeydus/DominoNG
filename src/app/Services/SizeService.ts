import { Injectable, signal } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class SizeService {
    boardSize = signal<number>(768);
    hoverCords= signal<[number, number] | null>(null);
    constructor() {
        window.onresize = () => {
            const vw = window.innerWidth / 100
            this.boardSize.set(Math.min(vw * 90, 768))
        }
        const vw = window.innerWidth / 100
        this.boardSize.set(Math.min(vw * 90, 768))
    }
    setHoverCords(cords: [number, number] | null) {
        this.hoverCords.set(cords)
    }
}