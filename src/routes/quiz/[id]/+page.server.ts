import type { Tables } from "$lib/db/types";
import type { QuestionSet } from "$lib/shared";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

type QuizSchemaReturnType = Tables<"quiz"> & { question_set: QuestionSet[] };

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
	const { data, error: err } = await supabase
		.from("quiz")
		.select("")
		.eq("id", params.id)
		.returns<QuizSchemaReturnType[]>();

	if (err || data.length === 0) {
		error(404, "Not found");
	}

	return {
		quizId: params.id,
		quizName: data[0].name,
		questionSet: data[0].question_set
	};
};
