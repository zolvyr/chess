export function renderMoves(moves) {
    moves.forEach((coords) => {
        const row = coords[0];
        const col = coords[1];

        const square = document.querySelector(
            `.square[data-row="${row}"][data-col="${col}"`
        )

        square.style.position = "relative";

        const piece = square.querySelector("img");

        if (!piece) {
            const circle = makeCircleForUsualMove();
            square.appendChild(circle);
        } else {
            const circle = makeCircleForCapture();
            square.appendChild(circle);
        }
    })
}

function makeCircleForUsualMove() {
    const moveCircle = document.createElement("div");

    moveCircle.dataset.move = "move";

    moveCircle.style.backgroundColor = "lightgreen";
    moveCircle.style.filter = "opacity(0.5)";
    moveCircle.style.width = "30px";
    moveCircle.style.height = "30px";
    moveCircle.style.borderRadius = "50%";
    moveCircle.style.position = "absolute";
    moveCircle.style.top = "50%";
    moveCircle.style.left = "50%";
    moveCircle.style.transform = "translate(-50%, -50%)";

    return moveCircle;
}

// TODO: make this function work
function makeCircleForCapture() {
    const moveCapture = document.createElement("div");

    moveCapture.dataset.capture = "capture";

    moveCapture.style.position = "absolute";
    moveCapture.style.width = "100px";
    moveCapture.style.height = "100px";
    moveCapture.style.box = "shadow: 0 0 0 9999px rgba(0, 0, 0, 0.8)";
    moveCapture.style.borderRadius = "50%";

    return moveCapture;
}
