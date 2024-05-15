import { error, redirect, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();
	if (!session) {
		error(401, "Unauthorized");
	}

	const { error: err } = await supabase.auth.signOut();

	if (err) {
		error(500, "Something went wrong signing out");
	}

	redirect(303, "/");
};
