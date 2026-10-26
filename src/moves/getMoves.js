import { getMovesForPawn } from "./pawn.js";
import { getMovesForRook } from "./rook.js";

export function getMoves(square, piece) {
    const moveFromRow = Number(square.dataset.row);
    const moveFromCol = Number(square.dataset.col);
    const currPiece = piece.dataset.piece;
    const color = piece.dataset.color;

    switch (currPiece) {
        case "pawn":
            const isMoved = piece.dataset.isMoved;

            return getMovesForPawn(moveFromRow, moveFromCol, isMoved, color);
        case "rook":
            return getMovesForRook(moveFromRow, moveFromCol, color);
        case "knight":
        case "bishop":
        case "queen":
        case "king":
    }
}
