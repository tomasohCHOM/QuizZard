import sample from "$lib/questions/sample";
import { error, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
	default: async ({ locals: { supabase, getSession } }) => {
		const session = await getSession();

		if (!session) {
			error(404, "Not found");
		}

		await supabase
			.from("quiz")
			.insert({
				name: "MATH 251A-01 10.4-10.5 Quiz",
				question_set: sample,
				user_id: session.user.id
			});
	}
};
