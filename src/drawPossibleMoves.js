import { selectedSquare, selectedPiece } from "./piecesMovement.js";
import { getMoves } from "./getPossibleMoves.js";
import { getValidMoves } from "./validatePossibleMoves.js";

function renderMoves() {
    const moves = getMoves(selectedSquare, selectedPiece);
}
