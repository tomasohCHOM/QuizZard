import { error, redirect, type RequestHandler } from "@sveltejs/kit";

export const DELETE: RequestHandler = async ({ locals: { supabase, getSession }, params }) => {
	const session = await getSession();
	if (!session) {
		throw error(401, "Unauthorized");
	}

	if (!params.id) {
		throw error(404, "Quiz ID not found");
	}

	const { data, error: err } = await supabase
		.from("quiz")
		.delete()
		.eq("user_id", session.user.id)
		.eq("id", params.id);

	console.log(data);

	if (err) {
		throw error(500, "Server Error");
	}

	throw redirect(303, "/");
};
