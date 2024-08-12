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

	if (!session) {
		return { recentQuizzes: recentQuizzes ?? [], userQuizzes: [] };
	}

	const { data: userQuizzes, error: userQuizzesErr } = await supabase
		.from("quiz")
		.select("id, name, quiz_length, user_id")
		.eq("user_id", session.user.id!)
		.limit(4);

	if (userQuizzesErr) {
		error(500, "Server error");
	}

	return { recentQuizzes: recentQuizzes ?? [], userQuizzes: userQuizzes ?? [] };
};
