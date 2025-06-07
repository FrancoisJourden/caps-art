import init, {gap, diameter, width, height, image} from "./ts/input_handler";
import redraw from "./ts/steps/drawer.ts";
import calculator from "./ts/steps/calculator.ts";
import capsulator from "./ts/steps/capsulator.ts";
import colorizer from "./ts/steps/colorizer.ts";

let context: CanvasRenderingContext2D;

document.addEventListener("DOMContentLoaded", initContext);

function initContext() {
    context = document.querySelector<HTMLCanvasElement>('#canvas')?.getContext("2d")!;
    init();
}

function recalculate(){
    console.log("recalculating");
    const boardSpecs=  calculator({width: width, height: height}, diameter, gap);

    const caps = capsulator(boardSpecs, diameter, gap);

    if(image == null) return;
    const coloredCaps = colorizer(caps, {width: width, height: height}, image);
    redraw(coloredCaps);
    console.log("recalculated");
}

export {context, recalculate};