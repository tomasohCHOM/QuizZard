import { error, type Actions, redirect, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { z } from "zod";

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
		const quizName = data.get("quiz-name") as string;

		if (quizName === "") {
			return fail(400, { status: "Quiz name is missing." });
		}

		const quizSet = [];

		for (let i = 0; data.get(`question-prompt-${i}`) != null; i++) {
			const questionPrompt = data.get(`question-prompt-${i}`)?.toString()!;
			if (questionPrompt === "") {
				return fail(400, { status: "Each question must have a prompt." });
			}

			const correctAnswer = data.get(`correct-answer-${i}`)?.toString()!;
			if (correctAnswer === "") {
				return fail(400, { status: "Each question must have a correct answer." });
			}

			const incorrectAnswers: string[] = [];

			for (let j = 0; data.get(`incorrect-answer-${i}-${j}`) != null; j++) {
				const incorrectAnswer = data.get(`incorrect-answer-${i}-${j}`)?.toString()!;
				if (incorrectAnswer === "") {
					return fail(400, { status: "Incorrect answers should not be empty." });
				}
				incorrectAnswers.push(data.get(`incorrect-answer-${i}-${j}`)?.toString()!);
			}

			const question = { prompt: questionPrompt, correctAnswer, incorrectAnswers };
			quizSet.push(question);
		}

		await supabase.from("quiz").insert({
			name: quizName,
			question_set: quizSet,
			user_id: session.user.id
		});
		throw redirect(303, "/");
	}
};
