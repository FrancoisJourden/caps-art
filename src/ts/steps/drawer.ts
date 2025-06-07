import {context} from "../../main.ts";
import {diameter, offset, zoom} from "../input_handler.ts";
import type {CapColored} from "../types";


export default function redraw(caps: CapColored[]) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = "#ff0000";
    caps.forEach(cap => {
        context.beginPath();
        context.fillStyle = cap.color;
        context.arc((cap.x * zoom) + offset.x, (cap.y * zoom) + offset.y, diameter / 2 * zoom, 0, Math.PI * 2);
        context.fill();
        context.closePath();
    })
}