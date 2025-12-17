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

	const statistics_button = document.createElement("button");
	sidebar.appendChild(statistics_button);
	statistics_button.innerText = "Statistics";

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
