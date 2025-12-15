function createNotifContainer() {
	const container = document.createElement("div");
	document.body.appendChild(container);
	container.id = "notif-container";

	return container;
}

function renderNotif(message: string, level = 0) {
	void import ("./notif.css");

	const container = document.getElementById("notif-container") ?? createNotifContainer();

	const notif = document.createElement("p");
	container.appendChild(notif);
	notif.innerText = message;
	notif.classList.add(`level${level}`, "entering");

	setTimeout(() => {
		notif.animate([{ opacity: 1 }, { opacity: 0 }], {
			duration: 200,
			fill: "forwards"
		}).finished.then(() => {
			notif.remove();
			if (!container.childElementCount) container.remove();
		});
	}, 6000);
}

export default renderNotif;
