function createContent() {
	const content = document.createElement("main");
	document.body.appendChild(content);

	return content;
}

function getContent() {
	const content = document.getElementsByTagName("main").item(0);
	return content ?? createContent();
}

export default getContent;
