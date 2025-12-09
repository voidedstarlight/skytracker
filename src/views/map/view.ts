import { beginAnimation, endAnimation } from "./canvas/transform";
import getCanvas from "./canvas/init";
import getContent from "../../layout";
import maplibregl from "maplibre-gl";
import refreshStates from "./states";
import requestUpdate from "./canvas/update";

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

function mapView() {
	const content = getContent();
	const canvas = getCanvas();

	renderMap().then(map => {
		map.once("load", () => {
			map.on("movestart", () => beginAnimation(map))
			map.on("moveend", () => endAnimation(map));
		});

		refreshStates(map);
	});
}

export default mapView;
