import getCanvas from "./init";
import { getStates } from "../states";
import loadImages from "../svg";

interface PlaneGraphicsState {
	hex: string;
	x: int;
	y: int;
}

const graphics_states: Array<PlaneGraphicsState> = [];

function graphicsStates() {
	return graphics_states;
}

// todo: center plane image at position

const relevant_images: Array<[Image, int, int]> = [];

async function relevantStates(map: maplibregl.Map, use_cached: boolean) {
	if (use_cached) return relevant_images;

	const { _ne: ne, _sw: sw } = map.getBounds();
	const images = loadImages();

	const all_states = getStates();
	const all_hex = Object.keys(all_states);

	graphics_states.length = 0;
	relevant_images.length = 0;

	for (const hex of all_hex) {
		const state = all_states[hex];
		
		if (sw.lng < state.lon && state.lon < ne.lng && sw.lat < state.lat && state.lat < ne.lat) {
			const rel_lng = state.lon - sw.lng;

			// latitudes increase upward, but canvas coordinates increase downward: max lat - plane's lat
			const rel_lat = ne.lat - state.lat;

			const lng_range = ne.lng - sw.lng;
			const lat_range = ne.lat - sw.lat;

			const pct_lng = rel_lng / lng_range;
			const pct_lat = rel_lat / lat_range;

			// double window size for max coordinates for dpi
			const x = pct_lng * window.innerWidth;
			const y = pct_lat * window.innerHeight;

			let track_rounded = Math.round(state.track / 10);
			if (track_rounded === 36) track_rounded = 0

			graphics_states.push({
				hex: state.hex,
				x,
				y
			});

			relevant_images.push([await images.at(track_rounded), x * 2, y * 2]);
		}
	}

	return relevant_images;
}

async function updateCanvas(map: maplibregl.Map, use_cached: boolean) {
	const images = await relevantStates(map, use_cached);

	const canvas = getCanvas();
	const ctx = canvas.getContext("2d");

	ctx.clearRect(0, 0, window.innerWidth * 2, window.innerHeight * 2);

	images.forEach(parameters => {
		ctx.drawImage(parameters.at(0), parameters.at(1), parameters.at(2), 50, 50)
	});
}

function requestUpdate(map: maplibregl.Map, use_cached: boolean = false) {
	window.requestAnimationFrame(() => void updateCanvas(map, use_cached));
}

export { graphicsStates };
export default requestUpdate;
