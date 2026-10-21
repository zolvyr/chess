export function getMoves(square, piece) {
    const moveToRow = square.dataset.row;
    const moveToCol = square.dataset.col;

    const currPiece = piece.dataset.piece;

    switch (currPiece) {
        case "pawn":
            const isMoved = piece.dataset.isMoved;
            const color = piece.dataset.color;

            const moves = handlePawn(piece, moveToRow, moveToCol, isMoved, color);
            return moves;
        case "rook":
        case "knight":
        case "bishop":
        case "queen":
        case "king":
    }
}

function handlePawn(piece, row, col, isMoved, color) {
    let possibleMoves = [];

    switch (color) {
        case "white":
            if (isMoved === "false") {
                possibleMoves.push([row - 1, col], [row - 2, col]);
                piece.dataset.isMoved = "true";
            } else {
                possibleMoves.push([row - 1, col]);
            }
        case "black":
            if (isMoved === "false") {
                possibleMoves.push([row + 1, col], [row + 2, col]);
                piece.dataset.isMoved = "true";
            } else {
                possibleMoves.push([row + 1, col]);
            }
    }

    return possibleMoves;
}
