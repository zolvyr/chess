import { selectedSquare, selectedPiece } from "./piecesMovement.js";
import { getMoves } from "./getMoves.js";

function renderMoves() {
    const moves = getMoves(selectedSquare, selectedPiece);
}
