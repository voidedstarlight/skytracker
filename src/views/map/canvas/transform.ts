import { isRunning } from "../states";
import requestUpdate from "./update";

let ne: [float, float];
let sw: [float, float];

let request: int;

function animate(map: maplibregl.Map) {
	request = window.requestAnimationFrame(() => animate(map));
}

function beginAnimation(map: maplibregl.Map) {
	({ _ne: ne, _sw: sw } = map.getBounds());
	request = window.requestAnimationFrame(() => animate(map));
}

function endAnimation(map: maplibregl.Map) {
	window.cancelAnimationFrame(request);
	if (isRunning()) requestUpdate(map);
}

export { beginAnimation, endAnimation };
