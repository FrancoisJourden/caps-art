import { context, recalculate } from "../../main";
import { height, offset, resetOffset, resetZoom, resize, setOffset, setZoom, width, zoom } from "../input_handler";

export function save(){
    let saveOffset = offset;
    let saveZoom = zoom;
    context.canvas.width = width;
    context.canvas.height = height;
    resetOffset()
    resetZoom();
    recalculate();
    

    const url = context.canvas.toDataURL('image.png');
    const link = document.createElement("a");
    link.href = url;
    link.download = "caps.png";

    link.click();
    link.remove();

    setOffset(saveOffset);
    setZoom(saveZoom);
    resize();
    recalculate();
    
}