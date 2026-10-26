import { getValidMoves } from "./helperValidMoves.js";

export function getMovesForRook(row, col, color) {
    console.log(row, col);

    let left = [];
    let right = [];
    let top = [];
    let bottom = [];

    for (let i = col - 1; i >= 0; i++) {
        const coords = [row, i];
        left.push(coords);
    }

    for (let j = col + 1; j <= 7; j++) {
        const coords = [row, j];
        right.push(coords);
    }
    //
    // for (let k = row - 1; k >= 0; k++) {
    //     top.push([k, col]);
    // }
    //
    // for (let m = row + 1; m >= 0; m++) {
    //     bottom.push([m, col]);
    // }

    console.log(left);
    console.log(right);
    console.log(top);
    console.log(bottom);

    return getValidMoves([]);
}
