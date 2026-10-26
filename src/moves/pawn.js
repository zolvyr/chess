import { getValidMoves } from "./helperValidMoves.js";

function handleMoves(nextMoves, nextCaptures, color) {
    let possibleMoves = [];

    for (const coords of nextMoves) {
        const row = coords[0];
        const col = coords[1];

        const square = document.querySelector(
            `.square[data-row="${row}"][data-col="${col}"]`
        )

        // A piece that stands in front of the pawn doesn't allow to move forward
        if (!square.querySelector("img")) {
            possibleMoves.push(coords);
        } else {
            break;
        }
    }

    nextCaptures.forEach((coords) => {
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

    return possibleMoves;
}

export function getMovesForPawn(row, col, isMoved, color) {
    switch (color) {
        case "white":
            let nextMovesWhite = [[row - 1, col], [row - 2, col]];
            let nextCapturesWhite = [[row - 1, col - 1], [row - 1, col + 1]];

            if (isMoved === "true") {
                nextMovesWhite = nextMovesWhite.slice(0, 1);
            }

            nextMovesWhite = getValidMoves(nextMovesWhite);
            nextCapturesWhite = getValidMoves(nextCapturesWhite);

            const allowedMovesWhite = handleMoves(nextMovesWhite, nextCapturesWhite, "black");
            return allowedMovesWhite;
        case "black":
            let nextMovesBlack = [[row + 1, col], [row + 2, col]];
            let nextCapturesBlack = [[row + 1, col - 1], [row + 1, col + 1]];

            if (isMoved === "true") {
                nextMovesBlack = nextMovesBlack.slice(0, 1);
            }

            nextMovesBlack = getValidMoves(nextMovesBlack);
            nextCapturesBlack = getValidMoves(nextCapturesBlack);

            const allowedMovesBlack = handleMoves(nextMovesBlack, nextCapturesBlack, "white");
            return allowedMovesBlack;
    }
}
