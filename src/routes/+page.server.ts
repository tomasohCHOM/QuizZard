import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { supabase, getSession } }) => {
	const { data: recentQuizzes, error: recentQuizzesError } = await supabase
		.from("quiz")
		.select("id, name, quiz_length, user_id")
		.limit(4);

	if (recentQuizzesError) {
		error(500, "Server error");
	}

	const session = await getSession();

	let userQuizzes;
	let userQuizzesErr;

	if (session) {
		const { data, error } = await supabase
			.from("quiz")
			.select("id, name, quiz_length, user_id")
			.eq("user_id", session.user.id!)
			.limit(4);

		userQuizzes = data;
		userQuizzesErr = error;
	}

	if (userQuizzesErr) {
		error(500, "Server error");
	}

	return { recentQuizzes: recentQuizzes ?? [], userQuizzes: userQuizzes ?? [] };
};
