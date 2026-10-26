export function getValidMoves(moves) {
    const allowedMoves = [];

    if (!moves.length) return;

    moves.forEach((coords) => {
        const row = coords[0];
        const col = coords[1];

        if (0 <= row && row <= 7 && 0 <= col && col <= 7) {
            allowedMoves.push(coords);
        }
    })

    return allowedMoves;
}
