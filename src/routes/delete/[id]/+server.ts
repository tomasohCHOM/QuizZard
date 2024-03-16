import { error, redirect, type RequestHandler } from "@sveltejs/kit";

export const DELETE: RequestHandler = async ({ locals: { supabase, getSession }, params }) => {
	const session = await getSession();
	if (!session) {
		throw error(401, "Unauthorized");
	}

	if (!params.id) {
		throw error(404, "Quiz ID not found");
	}

	const { data, error: err } = await supabase.from("quiz").select("user_id").eq("id", params.id);

	if (err) throw error(500, "Server Error");
	if (!data) throw error(404, "Not found");

	if (data[0].user_id !== session.user.id) {
		throw error(401, "Unauthorized");
	}

	const { data: deleteData, error: deleteErr } = await supabase
		.from("quiz")
		.delete()
		.eq("id", params.id);

	if (deleteErr) {
		throw error(500, "Server Error");
	}

	throw redirect(303, "/");
};
