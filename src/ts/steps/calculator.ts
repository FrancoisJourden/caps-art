import type {BoardSpecs, Size} from "../types";

export default (boardSize: Size, capSize: number, capsGap: number): BoardSpecs => {
    const capSpace = capSize + capsGap;
    const x = capSpace * 0.289;
    const h = capSize * 0.577;
    return {
        nbRows: Math.floor(((boardSize.height / capSpace) * 2) - 1),
        evenRowSize: (boardSize.width + h) / (2 * x + 2 * h),
        oddRowSize: (boardSize.width - 2 *x + h) / (2 * x + 2 * h),
    }
}