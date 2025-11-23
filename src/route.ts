import mapView from "./views/map/view";

import "./layout.css";

if (document.getElementsByTagName("main").item(0)) {
	document.getElementsByTagName("main").item(0).remove();
}

const main = document.createElement("main");
document.body.appendChild(main);

mapView(main);
