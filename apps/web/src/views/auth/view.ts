import getContent from "../../layout";
import getSession, { authGeneric } from "../../auth";
import auth_errors from "./errors.json";

function renderError(form: HTMLElement) {
	const error_element = document.createElement("p");
	form.appendChild(error_element);
	error_element.id = "auth-error";

	return error_element;
}

function showError(form: HTMLElement, message: string) {
	const error_element = document.getElementById("auth-error") ?? renderError(form);
	error_element.innerText = auth_errors[message] ?? message;
}

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
			document.location = "/dash/map?login=1";
			return;
		}

		console.warn("[auth] failed to authenticate");
		showError(form, auth_result);
	});

	email_input.addEventListener("keydown", event => {
		if (event.key === "Enter" || event.key === "NumpadEnter") confirm.click();
	});

	password_input.addEventListener("keydown", event => {
		if (event.key === "Enter" || event.key === "NumpadEnter") confirm.click();
	});

}

function authView() {
	void getSession().then(data => {
		if (data) {
			document.location = "/dash/map?login=2";
			return;
		}

		renderForm();
	});
}

export default authView;
