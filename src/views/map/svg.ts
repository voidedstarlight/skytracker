import json from "./images.json";

const image_url = json.plane;

function loadSVG(angle: int) {
	const image = new Image();

	const loaded = new Promise(resolve => {
		image.addEventListener("load", () => resolve(image));
	});

	image.src = image_url.replaceAll("$angle", angle);

	return loaded;
}

function loadImages() {
	const images: Array<Image> = [];

	for (let angle = 0; angle < 360; angle += 10) {
		images.push(loadSVG(angle - 90))
	}

	return images;
}

export default loadImages;
