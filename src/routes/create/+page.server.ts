import sample from "$lib/questions/sample";
import type { Actions } from "@sveltejs/kit";

export const actions: Actions = {
	default: async ({ locals: { supabase } }) => {
		// await supabase.from("quiz").insert({ name: "MATH 251A-01 10.1 Quiz", question_set: sample });
	}
};
