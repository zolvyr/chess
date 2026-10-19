import { createBoard } from "./createBoard.js";
import { setupInitialPieces, setupDragging } from "./piecesMovement.js";

function main() {
    createBoard();
    setupInitialPieces();
    setupDragging();
}

main();
