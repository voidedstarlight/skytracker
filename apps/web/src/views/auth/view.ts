import auth_client from "../../auth";

function signUp() {
	auth_client.signUp.email({
		email: "a@a.com",
		password: "abcdef",
		name: "a@a.com",
  }).then((data, error) => {
		if (error) {
			console.warn("[auth] error in authenticating");
			console.warn(error);
			return;
		}

		console.log(data);
	});

}

function authView() {
	console.log("auth");
}

export default authView;
