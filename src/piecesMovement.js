import { pieces } from "./initialPiecesState.js";
import { getMoves } from "./getPossibleMoves.js";

export function setupInitialPieces() {
    for (const dataAboutSquare of pieces) {
        const { row, col, piece, color, path } = dataAboutSquare;

        const currentSquare = document.querySelector(
            `.square[data-row="${row}"][data-col="${col}"]`,
        );

        const currentPiece = document.createElement("img");

        if (piece === "pawn") {
            currentPiece.dataset.isMoved = "false";
        }

        currentPiece.dataset.piece = piece;
        currentPiece.dataset.color = color;
        currentPiece.src = path;

        currentSquare.appendChild(currentPiece);
    }
}

export let selectedSquare = null;
export let selectedPiece = null;
let hoveredSquare = null;

export function setupDragging() {
    const squares = document.querySelectorAll(".square");

    squares.forEach((square) => {
        square.addEventListener("mousedown", (event) => {
            const piece = square.querySelector("img");

            if (!piece) return;

            selectedSquare = square;
            selectedPiece = piece;

            const pieceRect = selectedPiece.getBoundingClientRect();

            const newLeft = event.clientX - pieceRect.width / 2;
            const newTop = event.clientY - pieceRect.width / 2;

            setPiecePosition(newLeft, newTop);

            startDragging(event);
        });
    });
}

function highlightSquare() {
    selectedSquare.style.backgroundColor = "darkgreen";
}

function disableHighlightSquare() {
    const row = selectedSquare.dataset.row;
    const col = selectedSquare.dataset.col;

    if (row % 2 === col % 2) {
        selectedSquare.style.backgroundColor = "#F0D9B5";
    } else {
        selectedSquare.style.backgroundColor = "#B58863";
    }
}

function enableHover() {
    const board = document.querySelector(".board");
    board.dataset.hoverEnabled = true;
}

function disableHover() {
    const board = document.querySelector(".board");
    board.dataset.hoverEnabled = false;
}

function startDragging(event) {
    event.preventDefault();

    highlightSquare();
    preparePieceForDragging();

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
}

function preparePieceForDragging() {
    const pieceRect = selectedPiece.getBoundingClientRect();

    selectedPiece.style.position = "fixed";
    selectedPiece.style.zIndex = "1000";
    selectedPiece.style.pointerEvents = "none";
    selectedPiece.style.width = `${pieceRect.width}px`;
    selectedPiece.style.height = `${pieceRect.height}px`;
    selectedPiece.style.left = `${pieceRect.left}px`;
    selectedPiece.style.top = `${pieceRect.top}px`;
}

function setPiecePosition(left, top) {
    selectedPiece.style.left = `${left}px`;
    selectedPiece.style.top = `${top}px`;
}

function handleMouseMove(event) {
    enableHover();

    const board = document.querySelector(".board");
    const boardRect = board.getBoundingClientRect();

    const pieceRect = selectedPiece.getBoundingClientRect();

    // Ensures that the piece will move inside of the board
    const x = Math.max(
        boardRect.left,
        Math.min(event.clientX, boardRect.right - 1)
    );
    const y = Math.max(
        boardRect.top,
        Math.min(event.clientY, boardRect.bottom - 1)
    );

    const newLeft = x - pieceRect.width / 2;
    const newTop = y - pieceRect.height / 2;

    highlightSquareWhileDragging(x, y);

    setPiecePosition(newLeft, newTop);
}

function highlightSquareWhileDragging(x, y) {
    const elemUnderCursor = document.elementFromPoint(x, y);
    const square = elemUnderCursor?.closest(".square");

    if (square && square !== hoveredSquare) {
        hoveredSquare?.classList.remove("drag-hover");

        hoveredSquare = square;
        hoveredSquare.classList.add("drag-hover")
    }
}

function disableHighlightSquareWhileDragging() {
    hoveredSquare.classList.remove("drag-hover");
    hoveredSquare = null;
}

function resetPiecePosition() {
    selectedPiece.style.position = "";
    selectedPiece.style.zIndex = "";
    selectedPiece.style.pointerEvents = "";
    selectedPiece.style.width = "";
    selectedPiece.style.height = "";
    selectedPiece.style.left = "";
    selectedPiece.style.top = "";
}


function movePieceToNewSquare() {
    const pieceRect = selectedPiece.getBoundingClientRect();

    const x = pieceRect.left + pieceRect.width / 2;
    const y = pieceRect.top + pieceRect.height / 2;

    const element = document.elementFromPoint(x, y);
    const targetSquare = element?.closest(".square");

    if (targetSquare) {
        const moves = getMoves(selectedSquare, selectedPiece);

        targetSquare.appendChild(selectedPiece);
    }
}

function handleMouseUp() {
    disableHover();
    disableHighlightSquare();
    disableHighlightSquareWhileDragging();
    movePieceToNewSquare();
    resetPiecePosition();

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
}
