let opened = false;

function createSidebar() {
	void import("./component.css");

	const toggle_button = document.createElement("button");
	document.body.appendChild(toggle_button);
	toggle_button.innerText = "☰";
	toggle_button.classList.add("sidebar-toggle");

	const sidebar = document.createElement("aside");
	document.body.appendChild(sidebar);

	const map_button = document.createElement("button");
	sidebar.appendChild(map_button);
	map_button.innerText = "Map";

	map_button.addEventListener("click", () => document.location = "/dash/map");

	const stats_button = document.createElement("button");
	sidebar.appendChild(stats_button);
	stats_button.innerText = "Statistics";

	stats_button.addEventListener("click", () => document.location = "/dash/stats");

	const log_button = document.createElement("button");
	sidebar.appendChild(log_button);
	log_button.innerText = "Log Flight";

	log_button.addEventListener("click", () => document.location = "/dash/log");

	sidebar.addEventListener("animationend", () => {
		if (opened) sidebar.classList.remove("open");
		else sidebar.classList.add("open");

		sidebar.classList.remove(opened ? "closing" : "opening");
		opened = !opened;
	});

	toggle_button.addEventListener("click", () => {
		sidebar.classList.add(opened ? "closing" : "opening");
	});
}

export default createSidebar;
