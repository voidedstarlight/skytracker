import authView from "./views/auth/view";
import dashMapView from "./views/dash/map/view";
import dashStatsView from "./views/dash/stats/view";
import mapView from "./views/map/view";

import "./layout.css";

const VIEWS = {
	"/": mapView,
	"/auth": authView,
	"/dash/map": dashMapView,
	"/dash/stats": dashStatsView
};

function loadView() {
	const path = document.location.pathname;
	const view = VIEWS[path];

	if (view) view();
}

loadView();
