import type { QuestionSet } from "$lib/shared";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

type QuestionSetReturnType = {
	question_set: QuestionSet[];
};

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
	const { data, error: err } = await supabase
		.from("quiz")
		.select("question_set")
		.eq("id", params.id)
		.returns<QuestionSetReturnType[]>();

	if (err || data.length === 0) {
		error(404, "Not found");
	}

	return {
		questionSet: data[0].question_set
	};
};
