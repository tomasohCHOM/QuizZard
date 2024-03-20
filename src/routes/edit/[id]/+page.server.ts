import { error, type Actions, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { v4 as uuidv4 } from "uuid";
import type { QuestionSet } from "$lib/shared";

type QuestionSetReturnType = {
	name: string;
	question_set: QuestionSet[];
};

export const load: PageServerLoad = async ({ params, locals: { supabase, getSession } }) => {
	const session = await getSession();
	if (!session) {
		throw error(401, "Unauthorized");
	}

	const { data, error: err } = await supabase
		.from("quiz")
		.select("")
		.eq("id", params.id)
		.returns<QuestionSetReturnType[]>();

	if (err || data.length === 0) {
		error(404, "Not found");
	}

	return {
		quiz: data[0],
		quizId: params.id
	};
};

export const actions: Actions = {
	default: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();

		if (!session) {
			error(404, "Not found");
		}

		const data = await request.formData();
		const quizName = data.get("quiz-name") as string;
		const fails: string[] = [];

		if (quizName === "") {
			fails.push("Quiz name is missing.");
		}

		const quizSet = [];

		for (let i = 0; data.get(`question-prompt-${i}`) != null; i++) {
			const questionPrompt = data.get(`question-prompt-${i}`)?.toString()!;
			if (questionPrompt === "") {
				fails.push("Each question must have a prompt.");
			}

			const correctAnswer = data.get(`correct-answer-${i}`)?.toString()!;
			if (correctAnswer === "") {
				fails.push("Each question must have a correct answer.");
			}

			const incorrectAnswers: string[] = [];

			for (let j = 0; data.get(`incorrect-answer-${i}-${j}`) != null; j++) {
				const incorrectAnswer = data.get(`incorrect-answer-${i}-${j}`)?.toString()!;
				if (incorrectAnswer === "") {
					fails.push("Incorrect answers should not be empty.");
				}
				incorrectAnswers.push(data.get(`incorrect-answer-${i}-${j}`)?.toString()!);
			}

			if (fails.length !== 0) return fail(400, { fails: fails });

			const question = { prompt: questionPrompt, correctAnswer, incorrectAnswers };
			quizSet.push(question);
		}

		const quizId = uuidv4();

		const quiz = await supabase.from("quiz").update({
			name: quizName,
			question_set: quizSet
		});

		if (quiz.error) {
			return error(500, "Server error");
		}

		return { success: true, quizId };
	}
};
