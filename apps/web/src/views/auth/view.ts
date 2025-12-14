import getSession, { authGeneric } from "../../auth";

function authView() {
	void getSession().then(async data => {
		if (data) {
			document.location = "/dash?login=2";
			return;
		}

		const auth_result = await authGeneric("a@a.com", "abcdef");

		if (auth_result === 0) {
			document.location = "/dash?login=1";
			return;
		}

		console.error("[auth] failed to authenticate");
		console.error(auth_result);
	});
}

export default authView;
