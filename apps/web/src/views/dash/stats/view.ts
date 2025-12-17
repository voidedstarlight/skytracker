import getContent from "../../../layout";

function createSidebar(container: HTMLElement) {
	const sidebar = document.createElement("aside");
	container.appendChild(sidebar);

	const map_button = document.createElement("button");
	sidebar.appendChild(map_button);
	map_button.innerText = "Map";

	const statistics_button = document.createElement("button");
	sidebar.appendChild(statistics_button);
	statistics_button.innerText = "Statistics";
}

function dashStatsView() {
	const content = getContent();
	createSidebar(content);
}

export default dashStatsView;
