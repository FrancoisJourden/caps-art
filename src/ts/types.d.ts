export interface Coordinates2d {
    x: number;
    y: number;
}

export interface Offset2d extends Coordinates2d {
}

export interface Size {
    width: number;
    height: number;
}

export interface Cap {
    x: number;
    y: number;
}

export interface Colored {
    color: string | CanvasGradient | CanvasPattern;
}

type CapColored = Cap & Colored;
// interface CapColored implements Cap, Colored{}


interface BoardSpecs {
    evenRowSize: number;
    oddRowSize: number;
    nbRows: number;
}

enum ColorizationMode {
    AVERAGE,
    CENTER,
}