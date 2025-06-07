import type {BoardSpecs, Cap} from "../types";

export default (boardSpecs: BoardSpecs, capSize: number, gap: number): Cap[] => {
    const capSpace = capSize + gap;
    const x = capSpace * 0.289;
    const h = capSpace * 0.577;

    const caps: Cap[] = [];

    for (let row = 0; row < boardSpecs.nbRows; row++) {
        const rowSize = row % 2 === 0 ? boardSpecs.evenRowSize : boardSpecs.oddRowSize;
        let baseXOffset;
        let yOffset = capSpace * (row/2 + 0.5);
        if (row % 2 == 0) {
            baseXOffset = x + (h * 0.5);
        }
        else {
            baseXOffset = (h * 1.5) + (2 * x);
        }
        // const yOffset = (row / 2) * capSpace + (row % 2 === 0 ? 0 : capSize / 2) + capSpace / 2;

        for (let col = 0; col < rowSize; col++) {
            const xOffset = baseXOffset + (col * (2* x + 2*h));
            caps.push({x: xOffset, y: yOffset});
        }
    }

    return caps;
}