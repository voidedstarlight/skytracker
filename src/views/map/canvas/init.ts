import getContent from "../../../layout";

function resizeCanvas() {
	const canvas = getCanvas();
	canvas.height = window.innerHeight * 2;
	canvas.width = window.innerWidth * 2;
	canvas.style.height = `${window.innerHeight}px`;
	canvas.style.width = `${window.innerWidth}px`;
}

function createCanvas() {
	const content = getContent();

	const canvas = document.createElement("canvas");
	content.appendChild(canvas);
	canvas.id = "map-canvas";

	resizeCanvas(canvas);
	window.addEventListener("resize", () => resizeCanvas(canvas));

	return canvas;
}

function getCanvas() {
	return document.getElementById("map-canvas") ?? createCanvas();
}

export default getCanvas;
