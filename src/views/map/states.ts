import requestUpdate from "./canvas/update";

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

let current_timeout: int;

function getStates() {
	return all_states;
}

async function refreshStates(map: maplibregl.Map) {
	current_timeout = setTimeout(() => refreshStates(map), 2500);

	const { lat, lng } = map.getCenter();
	const request = await fetch(`https://api.airplanes.live/v2/point/${lat}/${lng}/250`);

	let states: Array<PlaneState> = [];

	try {
		const response = await request.json();
		states = response.ac;
	} catch (error) {
		console.warn("[map/states] could not parse states data returned by airplanes.live");
		return;
	}

	states.forEach(plane => {
		all_states[plane.hex] = plane;
	});

	if (isRunning) requestUpdate(map);	
}

function stopTimeout() {
	window.clearTimeout(current_timeout);
	current_timeout = null;
}

function isRunning() {
	return current_timeout !== null;
}

export { getStates, stopTimeout, isRunning };
export default refreshStates;
