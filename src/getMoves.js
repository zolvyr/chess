export function getMoves(square, piece) {
    const moveToRow = Number(square.dataset.row);
    const moveToCol = Number(square.dataset.col);

    const currPiece = piece.dataset.piece;

    switch (currPiece) {
        case "pawn":
            const isMoved = piece.dataset.isMoved;
            const color = piece.dataset.color;

            const allMoves = getMovesForPawn(moveToRow, moveToCol, isMoved, color);
            return getValidMoves(allMoves);
        case "rook":
        case "knight":
        case "bishop":
        case "queen":
        case "king":
    }
}

function getMovesForPawn(row, col, isMoved, color) {
    let possibleMoves = [];

    function getAllowedNextMoves(moves) {
        if (isMoved === "true") {
            moves = moves.slice(0, 1);
        }

        for (const coords of moves) {
            const row = coords[0];
            const col = coords[1];

            const square = document.querySelector(
                `.square[data-row="${row}"][data-col="${col}"]`
            )

            // A piece that stands in front of the pawn doesn't allow to move forward
            if (!square.querySelector("img")) {
                possibleMoves.push(coords);
            } else {
                return;
            }
        }
    }

    function getAllowedNextCaptures(captures) {
        captures.forEach((coords) => {
            const row = coords[0];
            const col = coords[1];

            const square = document.querySelector(
                `.square[data-row="${row}"][data-col="${col}"]`
            )

            if (square.querySelector("img")) {
                possibleMoves.push(coords);
            }
        })
    }

    switch (color) {
        case "white":
            const nextMovesW = [[row - 1, col], [row - 2, col]];
            const nextCapturesW = [[row - 1, col - 1], [row - 1, col + 1]];

            getAllowedNextMoves(nextMovesW);
            getAllowedNextCaptures(nextCapturesW);

            break;
        case "black":
            const nextMovesB = [[row + 1, col], [row + 2, col]];
            const nextCapturesB = [[row + 1, col - 1], [row + 1, col + 1]];

            getAllowedNextMoves(nextMovesB);
            getAllowedNextCaptures(nextCapturesB);

            break;
    }

    return possibleMoves;
}

function getValidMoves(moves) {
    const allowedMoves = [];

    moves.forEach((coords) => {
        const row = coords[0];
        const col = coords[1];

        if (0 <= row && row <= 7 && 0 <= col && col <= 7) {
            allowedMoves.push(coords);
        }
    })

    return allowedMoves;
}
