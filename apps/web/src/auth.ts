import { createAuthClient } from "better-auth/client";

const auth_client = createAuthClient({
	basePath: "/A/auth"
});

async function getSession() {
	const { data, error } = await auth_client.getSession();
	if (error) {
		console.warn("[auth] error retrieving session data");
		return false;
	}

	return data;
}

async function signIn(email: string, password: string): string | 0 {
	const { data, error } = await auth_client.signIn.email({
		email,
		password
	});

	if (error) {
		console.warn("[auth] failed to sign in");
		return error.code;
	}

	return 0;
}

async function authGeneric(email: string, password: string): string | 0 {
	const { data, error } = await auth_client.signUp.email({
		email,
		name: email,
		password,
	});

	if (error) {
		if (error.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") return signIn(email, password);

		console.warn("[auth] failed to sign up");
		return error.code ?? error.status;
	}

	return 0;
}

export { authGeneric };
export default getSession;
