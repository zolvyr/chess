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

    function getAllowedNextCaptures(captures, color) {
        captures.forEach((coords) => {
            const row = coords[0];
            const col = coords[1];

            const square = document.querySelector(
                `.square[data-row="${row}"][data-col="${col}"]`
            )

            const img = square.querySelector("img");

            if (img && img.dataset.color === color) {
                possibleMoves.push(coords);
            }
        })
    }

    switch (color) {
        case "white":
            const nextMovesWhite = [[row - 1, col], [row - 2, col]];
            const nextCapturesWhite = [[row - 1, col - 1], [row - 1, col + 1]];

            getAllowedNextMoves(nextMovesWhite);
            getAllowedNextCaptures(nextCapturesWhite, "black");

            break;
        case "black":
            const nextMovesBlack = [[row + 1, col], [row + 2, col]];
            const nextCapturesBlack = [[row + 1, col - 1], [row + 1, col + 1]];

            getAllowedNextMoves(nextMovesBlack);
            getAllowedNextCaptures(nextCapturesBlack, "white");

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
