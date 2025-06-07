import type {Offset2d} from "./types";
import {context, recalculate} from "../main.ts";
import { save } from "./steps/saver.ts";

const defaultZoom = 1.0;
const defaultOffset: Offset2d = {x: 0, y: 0};
const defaultGap = 1;
const defaultDiameter = 30;
const defaultWidth = 1000;
const defaultHeight = 1000;

let zoomButton: HTMLButtonElement;
let offsetInput: HTMLButtonElement;
let gapInput: HTMLInputElement;
let diameterInput: HTMLInputElement;
let widthInput: HTMLInputElement;
let heightInput: HTMLInputElement;
let saveButton: HTMLButtonElement;

let zoom: number = defaultZoom;
let offset: Offset2d = defaultOffset;
let gap: number = defaultGap;
let diameter: number = defaultDiameter;
let width: number = defaultWidth;
let height: number = defaultHeight;
let image: ImageData | null = null;

export {zoom, offset, gap, diameter, width, height, image};

export default () => {
    initAutoResize();
    initZoomInput();
    initOffsetInput();
    initGapInput();
    initDiameterInput();
    initWidthInput();
    initHeightInput();
    initImageInput();
    initSaveButton();
};

export function resize() {
    const canvas = context.canvas;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    recalculate();
}

function initAutoResize() {
    resize();
    window.addEventListener("resize", resize);
}

export function setZoom(newZoom: number) {
    zoom = newZoom;
    recalculate();
}

export const resetZoom=  () => setZoom(defaultZoom); 

function initZoomInput() {
    zoomButton = document.querySelector('#reset_zoom')!;
    context.canvas.addEventListener("wheel", (e) => {
        if (e.deltaY == 0) return;

        if (e.deltaY < 0) setZoom(zoom / (-e.deltaY / 100));
        else setZoom(zoom * (e.deltaY / 100));
    })
    zoomButton.addEventListener("click", resetZoom);
}

export function setOffset(newOffset: Offset2d) {
    offset = newOffset;
    recalculate();
}

export const resetOffset = () => setOffset(defaultOffset);
function initOffsetInput() {
    offsetInput = document.querySelector('#reset_position')!;
    let startX: number;
    let startY: number;
    context.canvas.addEventListener("mousedown", onMouseDown);

    function onMouseDown(e: MouseEvent) {
        startX = e.clientX;
        startY = e.clientY;
        context.canvas.addEventListener("mousemove", onMouseMove);
        context.canvas.addEventListener("mouseup", onMouseUp);
    }

    function onMouseMove(e: MouseEvent) {
        let dx = e.clientX - startX;
        let dy = e.clientY - startY;
        startX = e.clientX;
        startY = e.clientY;
        setOffset({x: offset.x + dx, y: offset.y + dy});
    }

    function onMouseUp() {
        context.canvas.removeEventListener("mousemove", onMouseMove);
    }

    offsetInput.addEventListener("click", resetOffset);
}

function initIntInput(input: HTMLInputElement, callback: (value: number) => void, defaultValue: number | null = null) {
    input.value = defaultValue ? defaultValue.toString() : "";
    input.addEventListener("input", () => {
        let newValue = parseInt(input.value);
        if (isNaN(newValue)) return;
        callback(newValue);
        recalculate();
    });

}

function initGapInput() {
    gapInput = document.querySelector('#gap')!;
    initIntInput(gapInput, (val) => gap = val, defaultGap);
}

function initDiameterInput() {
    diameterInput = document.querySelector('#diameter')!;
    initIntInput(diameterInput, (val) => diameter = val, defaultDiameter);
}

function initWidthInput() {
    widthInput = document.querySelector('#width')!;
    initIntInput(widthInput, (val) => width = val, defaultWidth);
}

function initHeightInput() {
    heightInput = document.querySelector('#height')!;
    initIntInput(heightInput, (val) => height = val, defaultHeight);
}

function initImageInput() {
    const imageInput = document.querySelector<HTMLInputElement>('#image')!;
    imageInput.addEventListener("input", () => {
        const file = imageInput.files?.[0];
        if (!file) return;

        const img = new Image();
        const url = URL.createObjectURL(file);

        const canvas = document.querySelector<HTMLCanvasElement>('#imgRenderer')!;
        const ctx = canvas.getContext('2d')!;

        img.onload = () => {
            if (img.width > img.height) {
                canvas.height = img.height * (canvas.width / img.width);
            } else {
                canvas.width = img.width * (canvas.height / img.height);
            }

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            image = ctx.getImageData(0, 0, canvas.width, canvas.height);
            URL.revokeObjectURL(url);
            recalculate();
        }
        img.src = url;
    })
}

function initSaveButton() {
    saveButton = document.querySelector('#save')!;
    saveButton.addEventListener("click", save);
}