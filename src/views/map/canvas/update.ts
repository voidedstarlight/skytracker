import getCanvas from "./init";
import { getStates } from "../states";
import loadImages from "../svg";

async function relevantStates(map: maplibregl.Map) {
	const { _ne: ne, _sw: sw } = map.getBounds();
	const images = loadImages();

	const all_states = getStates();
	const all_hex = Object.keys(all_states);

	const relevant_images: Array<[Image, int, int]> = [];

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
			const x = pct_lng * window.innerWidth * 2;
			const y = pct_lat * window.innerHeight * 2;

			let track_rounded = Math.round(state.track / 10);
			if (track_rounded === 36) track_rounded = 0

			relevant_images.push([await images.at(track_rounded), x, y]);
		}
	}

	return relevant_images;
}

async function updateCanvas(map: maplibregl.Map) {
	const images = await relevantStates(map);

	const canvas = getCanvas();
	const ctx = canvas.getContext("2d");

	ctx.clearRect(0, 0, window.innerWidth * 2, window.innerHeight * 2);

	images.forEach(parameters => {
		ctx.drawImage(parameters.at(0), parameters.at(1), parameters.at(2), 50, 50)
	});
}

function requestUpdate(map: maplibregl.Map) {
	window.requestAnimationFrame(() => void updateCanvas(map));
}

export default requestUpdate;
