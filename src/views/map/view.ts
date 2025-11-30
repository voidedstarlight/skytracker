import getContent from "../../layout";
import loadImages from "./svg.ts";
import maplibregl from "maplibre-gl";
import plane from "./plane.svg";

interface PlaneState {
	alert: int;
	alt_baro: int;
	alt_geom: int;
	baro_rate: int;
	category: string;
	desc: string;
	dir: float;
	dst: float;
	emergency: string;
	flight: string;
	gs: int;
	gva: int;
	hex: string;
	lat: float;
	lon: float;
	messages: int;
	mlat: Array<string>;
	nac_p: int;
	nac_v: int;
	nav_altitude_mcp: int;
	nav_qnh: float;
	nic: int;
	nic_baro: int;
	ownOp: string;
	r: string;
	rc: int;
	rssi: int;
	sda: int;
	seen: int;
	seen_pos: float;
	sil: int;
	sil_type: string;
	spi: int;
	squawk: string;
	t: string;
	tisb: Array<string>;
	track: int;
	type: string;
	version: int;
	year: string;
}

const all_states: Record<string, PlaneState> = {};

function createCanvas() {
	const content = getContent();

	const canvas = document.createElement("canvas");
	content.appendChild(canvas);
	canvas.id = "map-canvas";

	return canvas;
}

function getCanvas() {
	return document.getElementById("map-canvas") ?? createCanvas();
}

async function renderMap() {
	void import("maplibre-gl/dist/maplibre-gl.css");
	void import("./map.css");

	const content = getContent();

	const map_style = await import("./map.json");
	
	const map_container = document.createElement("div");
	content.appendChild(map_container);
	map_container.classList.add("map");

	const map = new maplibregl.Map({
		center: [-90, 40],
		container: map_container,
		style: map_style,
		zoom: 4
	});

	return map;
}

function updateCanvas(map: maplibregl.Map) {
	const { _ne: ne, _sw: sw } = map.getBounds();

	const canvas = getCanvas();
	const ctx = canvas.getContext("2d");

	const width = canvas.width;
	const height = canvas.height;

	ctx.clearRect(0, 0, width, height);

	const images = loadImages();

	Object.keys(all_states).forEach(async hex => {
		const state = all_states[hex];
		
		if (sw.lng < state.lon && state.lon < ne.lng && sw.lat < state.lat && state.lat < ne.lat) {
			const rel_lng = state.lon - sw.lng;

			// latitudes increase upward, but canvas coordinates increase downward: max lat - plane's lat
			const rel_lat = ne.lat - state.lat;

			const lng_range = ne.lng - sw.lng;
			const lat_range = ne.lat - sw.lat;

			const pct_lng = rel_lng / lng_range;
			const pct_lat = rel_lat / lat_range;

			const x = pct_lng * width;
			const y = pct_lat * height;

			let track_rounded = Math.round(state.track / 10);
			if (track_rounded === 36) track_rounded = 0

			ctx.drawImage(await images.at(track_rounded), x, y, 50, 50);
		}	
	});
}

function requestAnimation(map: maplibregl.Map) {
	window.requestAnimationFrame(() => updateCanvas(map));
}

async function requestUpdate(map: maplibregl.Map) {
	const { lat, lng  } = map.getCenter();
	const request = await fetch(`https://api.airplanes.live/v2/point/${lat}/${lng}/250`);

	let states: Array<PlaneState> = [];

	try {
		const response = await request.json();
		states = response.ac;
	} catch (error) {
		console.warn("[map/states] could not parse states data returned by opensky");
		return;
	}

	states.forEach(plane => {
		all_states[plane.hex] = plane;
	});

	requestAnimation(map);
}

function resizeCanvas() {
	const canvas = getCanvas();
	canvas.height = window.innerHeight * 2;
	canvas.width = window.innerWidth * 2;
	canvas.style.height = `${window.innerHeight}px`;
	canvas.style.width = `${window.innerWidth}px`;
}

function mapView() {
	const content = getContent();

	const canvas = getCanvas();
	resizeCanvas(canvas);
	window.addEventListener("resize", () => resizeCanvas(canvas));

	renderMap().then(map => {
		map.once("load", () => {
			map.on("move", () => requestAnimation(map));
		});

		setInterval(() => requestUpdate(map), 1000);
	});
}

export default mapView;
