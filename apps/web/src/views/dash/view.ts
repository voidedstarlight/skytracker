import createMap from "../../components/map/component";
import getContent from "../../layout";
import renderNotif from "../../notif";

function parseParams() {
	void import("./view.css");

	const search = document.location.search;
	const params = new URLSearchParams(search);
	const login = params.get("login");

	if (login === "1") {
		renderNotif("Logged in successfully", -1);
	} else if (login === "2") {
		renderNotif("Already logged in", -1);
	}
}

function dashView() {
	parseParams();
	const content = getContent();

	const container = document.createElement("div");
	content.appendChild(container);
	container.classList.add("map");

	const map = createMap(container);
}

export default dashView;
