import { beginAnimation, endAnimation } from "./canvas/transform";
import { click, pointerMove } from "./mouse";
import getCanvas from "./canvas/init";
import getContent from "../../layout";
import maplibregl from "maplibre-gl";
import navigate from "../../route";
import refreshStates, { stopTimeout } from "./states";
import registerDeinit from "../../deinit";

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

	map_container.addEventListener("mousedown", click);
	map_container.addEventListener("mousemove", event => pointerMove(map, event));

	return map;
}

function mapView() {
	void import("./view.css");

	const content = getContent();
	const canvas = getCanvas();

	renderMap().then(map => {
		map.once("load", () => {
			map.on("movestart", () => beginAnimation(map))
			map.on("moveend", () => endAnimation(map));
		});

		registerDeinit(stopTimeout);
		refreshStates(map);
	});

	const user_button = document.createElement("button");
	content.appendChild(user_button);
	user_button.innerText = "Log In";
	user_button.classList.add("map-button", "user-button");

	user_button.addEventListener("click", () => navigate("auth"));
}

export default mapView;
