import { error, type Actions, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { getSession } }) => {
	const session = await getSession();
	if (!session) {
		throw error(401, "Unauthorized");
	}
};

export const actions: Actions = {
	default: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();

		if (!session) {
			error(404, "Not found");
		}

		const data = await request.formData();
		const quizName = await data.get("quiz-name");

		// await supabase
		// 	.from("quiz")
		// 	.insert({
		// 		name: "MATH 251A-01 10.4-10.5 Quiz",
		// 		question_set: sample,
		// 		user_id: session.user.id
		// 	});
		throw redirect(303, "/");
	}
};
