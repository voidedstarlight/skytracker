import getContent from "../../layout";
import getSession, { authGeneric } from "../../auth";

function renderForm() {
	void import("./view.css");

	const content = getContent();
	const form = document.createElement("div");
	content.appendChild(form);
	form.classList.add("form");

	const email_input = document.createElement("input");
	form.appendChild(email_input);
	email_input.placeholder = "Email";

	const password_input = document.createElement("input");
	form.appendChild(password_input);
	password_input.type = "password";
	password_input.placeholder = "Password";

	const confirm = document.createElement("button");
	form.appendChild(confirm);
	confirm.innerText = "Log In or Sign Up";

	confirm.addEventListener("click", async () => {
		const auth_result = await authGeneric(email_input.value, password_input.value);

		if (auth_result === 0) {
			document.location = "/dash?login=1";
			return;
		}

		console.error("[auth] failed to authenticate");
		console.error(auth_result);

	});
}

function authView() {
	void getSession().then(data => {
		if (data) {
			document.location = "/dash?login=2";
			return;
		}

		renderForm();
	});
}

export default authView;
