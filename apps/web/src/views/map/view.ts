import { beginAnimation, endAnimation } from "./canvas/transform";
import { click, pointerMove } from "./mouse";
import createMap from "../../components/map/component";
import getCanvas from "./canvas/init";
import getContent from "../../layout";
import navigate from "../../route";
import refreshStates from "./states";

async function renderMap() {
	void import("./map.css");
	const content = getContent();

	const map_container = document.createElement("div");
	content.appendChild(map_container);
	map_container.classList.add("map");

	const map = await createMap(map_container);

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

		refreshStates(map);
	});

	const user_button = document.createElement("button");
	content.appendChild(user_button);
	user_button.innerText = "Log In";
	user_button.classList.add("map-button", "user-button");

	user_button.addEventListener("click", () => document.location.pathname = "/auth");
}

export default mapView;
