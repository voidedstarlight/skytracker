import { createAuthClient } from "better-auth/client";

const auth_client = createAuthClient({
	basePath: "/A/auth"
});

export default auth_client;
