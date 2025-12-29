export type DominoLevel = {
    board: (number | null)[][];
    boardHorizontalNumbers: string;
    boardVerticalNumbers: string;
    completed?: boolean
}
export type BoardsResponse = {
    easyBoards: [DominoLevel, DominoLevel, DominoLevel],
    mediumBoards: [DominoLevel, DominoLevel, DominoLevel],
    hardBoards: [DominoLevel, DominoLevel, DominoLevel],
}