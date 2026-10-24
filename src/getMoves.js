export function getMoves(square, piece) {
    const moveToRow = Number(square.dataset.row);
    const moveToCol = Number(square.dataset.col);

    const currPiece = piece.dataset.piece;

    switch (currPiece) {
        case "pawn":
            const isMoved = piece.dataset.isMoved;
            const color = piece.dataset.color;

            const allMoves = handlePawn(moveToRow, moveToCol, isMoved, color);
            const validMoves = getValidMoves(allMoves);

            return validMoves;
        case "rook":
        case "knight":
        case "bishop":
        case "queen":
        case "king":
    }
}

function handlePawn(row, col, isMoved, color) {
    let possibleMoves = [];

    // Possible next move for white pawn
    const nextSquareW = document.querySelector(
        `.square[data-row="${row - 1}"][data-col="${col}"]`
    )

    // Possible next move for black pawn
    const nextSquareB = document.querySelector(
        `.square[data-row="${row + 1}"][data-col="${col}"]`
    )

    // Possible captures for white pawn
    const squareLeftW = document.querySelector(
        `.square[data-row="${row - 1}"][data-col="${col - 1}"]`
    )
    const squareRightW = document.querySelector(
        `.square[data-row="${row - 1}"][data-col="${col + 1}"]`
    )

    // Possible captures for black pawn
    const squareLeftB = document.querySelector(
        `.square[data-row="${row + 1}"][data-col="${col - 1}"]`
    )
    const squareRightB = document.querySelector(
        `.square[data-row="${row + 1}"][data-col="${col + 1}"]`
    )

    switch (color) {
        case "white":
            if (isMoved === "false") {
                possibleMoves.push([row - 1, col], [row - 2, col]);
            } else {
                if (!nextSquareW.querySelector("img")) {
                    possibleMoves.push([row - 1, col]);
                }

                if (squareLeftW.querySelector("img")) {
                    possibleMoves.push([row - 1, col - 1]);
                }

                if (squareRightW.querySelector("img")) {
                    possibleMoves.push([row - 1, col + 1]);
                }
            }
            break;
        case "black":
            if (isMoved === "false") {
                possibleMoves.push([row + 1, col], [row + 2, col]);
            } else {
                if (!nextSquareB.querySelector("img")) {
                    possibleMoves.push([row + 1, col]);
                }

                if (squareLeftB.querySelector("img")) {
                    possibleMoves.push([row + 1, col - 1]);
                }

                if (squareRightB.querySelector("img")) {
                    possibleMoves.push([row + 1, col + 1]);
                }
            }
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
