import authView from "./views/auth/view";
import { deinitAll } from "./deinit";
import mapView from "./views/map/view";

import "./layout.css";

const VIEWS = {
	"": mapView,
	"auth": authView
};

function getPath() {
	if (document.location.hash.startsWith("#")) return document.location.hash.slice(1);
	return document.location.hash;
}

function navigate(new_path?: string) {
	deinitAll();

	if (new_path) document.location.hash = new_path;

	if (document.getElementsByTagName("main").item(0)) {
		document.getElementsByTagName("main").item(0).remove();
	}

	const path = getPath();
	const view = VIEWS[path];

	if (view) view();
}

navigate();

export default navigate;
