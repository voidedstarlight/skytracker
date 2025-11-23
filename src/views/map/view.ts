import maplibregl from "maplibre-gl";

function renderMap(container: HTMLElement) {
	void import("maplibre-gl/dist/maplibre-gl.css");
	void import("./map.css");

	const map_container = document.createElement("div");
	container.appendChild(map_container);
	map_container.classList.add("map");

	const map = new maplibregl.Map({
		container: map_container,
		style: "https://demotiles.maplibre.org/globe.json"
	});
}

function mapView(main: HTMLElement) {
	renderMap(main);
}

export default mapView;
