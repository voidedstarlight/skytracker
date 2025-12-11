import authView from "./views/auth/view";
import mapView from "./views/map/view";

import "./layout.css";

const VIEWS = {
	"/": mapView,
	"/auth": authView
};

function loadView() {
	const path = document.location.pathname;
	const view = VIEWS[path];

	if (view) view();
}

loadView();
