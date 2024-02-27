import { error, redirect, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();
	if (!session) {
		throw error(401, "Unauthorized");
	}

	const { error: err } = await supabase.auth.signOut();

	if (err) {
		throw error(500, "Something went wrong signing out");
	}

	throw redirect(303, "/");
};
