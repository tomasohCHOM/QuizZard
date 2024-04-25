import { error, type Actions, fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { QuestionSchemaType } from "$lib/shared";

export const load: PageServerLoad = async ({ params, locals: { supabase, getSession } }) => {
	const session = await getSession();
	if (!session) {
		throw error(401, "Unauthorized");
	}

	const { data, error: err } = await supabase
		.from("quiz")
		.select("")
		.eq("id", params.id)
		.returns<QuestionSchemaType[]>();

	if (err || data.length === 0) {
		error(404, "Not found");
	}

	return {
		quiz: data[0],
		quizId: params.id
	};
};

export const actions: Actions = {
	edit: async ({ request, url, locals: { supabase, getSession } }) => {
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

		const quizId = url.pathname.substring(url.pathname.lastIndexOf("/") + 1).trim();

		const quiz = await supabase
			.from("quiz")
			.update({
				name: quizName,
				question_set: quizSet
			})
			.eq("id", quizId);

		if (quiz.error) {
			return error(500, "Server error");
		}

		return { success: true, quizId };
	},

	delete: async ({ locals: { supabase, getSession }, params }) => {
		const session = await getSession();
		if (!session) {
			throw error(401, "Unauthorized");
		}

		if (!params.id) {
			throw error(404, "Quiz ID not found");
		}

		const { data, error: err } = await supabase.from("quiz").select("user_id").eq("id", params.id);

		if (err) throw error(500, "Server Error");
		if (!data) throw error(404, "Not found");

		if (data[0].user_id !== session.user.id) {
			throw error(401, "Unauthorized");
		}

		const { data: deleteData, error: deleteErr } = await supabase
			.from("quiz")
			.delete()
			.eq("id", params.id);

		if (deleteErr) {
			throw error(500, "Server Error");
		}

    throw redirect(303, "/")
	}
};
