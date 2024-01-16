import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
	const { data, error: err } = await supabase
		.from("quiz")
		.select("question_set")
		.eq("id", params.id);

	if (err) {
		error(404, "Not found");
	}

	return {
		questionSet: data[0].question_set
	};
};
