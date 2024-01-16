import type { Actions } from "@sveltejs/kit";
import QUESTION_SET from "$lib/questions/sample";

export const actions: Actions = {
	default: async ({ locals: { supabase } }) => {
		const res = await supabase
			.from("quiz")
			.insert({ name: "ACM Quiz", question_set: QUESTION_SET });
	}
};
