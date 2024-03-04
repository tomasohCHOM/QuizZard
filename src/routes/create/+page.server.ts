import { error, type Actions, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { Question } from "$lib/shared";
import sample from "$lib/questions/sample";

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
		let quizSet = [];

		for (let i = 0; data.get(`question-prompt-${i}`) != null; i++) {
			let questionPrompt = data.get(`question-prompt-${i}`)?.toString()!;
			let correctAnswer = data.get(`correct-answer-${i}`)?.toString()!;
			let incorrectAnswers: string[] = [];

			for (let j = 0; data.get(`incorrect-answer-${i}-${j}`) != null; j++) {
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
