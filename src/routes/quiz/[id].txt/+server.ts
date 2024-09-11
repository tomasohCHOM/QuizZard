import type { QuestionSchemaType, Question } from "$lib/shared";
import { error, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ params, locals: { supabase } }) => {
	if (!params.id) {
		error(404, "Not found");
	}

	const { data, error: err } = await supabase
		.from("quiz")
		.select("*")
		.eq("id", params.id)
		.returns<QuestionSchemaType[]>();

	if (err || data.length === 0) {
		error(404, "Not found");
	}

	const questionSet: Question[] = data[0].question_set;

	const quizText = questionSet
		.map((q) => {
			return `Question: ${q.prompt}
Correct Answer: ${q.correctAnswer}
Incorrect Answers: ${q.incorrectAnswers.join(", ")}
    `;
		})
		.join("\n");

	const headers = new Headers({
		"Content-Type": "text/plain"
	});

	return new Response(quizText, {
		headers
	});
};
