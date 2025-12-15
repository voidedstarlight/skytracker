import maplibregl from "maplibre-gl";

async function createMap(container: HTMLElement) {
	void import("maplibre-gl/dist/maplibre-gl.css");
	const map_style = await import("./map.json");

	const map = new maplibregl.Map({
		center: [-90, 40],
		container: container,
		style: map_style,
		zoom: 4
	});

	return map;
}

export default createMap;
