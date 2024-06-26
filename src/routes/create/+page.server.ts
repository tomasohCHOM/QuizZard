import { error, type Actions, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { v4 as uuidv4 } from "uuid";
import { verifyQuizForm } from "$lib/db/form";
import { redirect } from "sveltekit-flash-message/server";

export const load: PageServerLoad = async ({ locals: { getSession } }) => {
	const session = await getSession();
	if (!session) {
		error(401, "Unauthorized");
	}
};

export const actions: Actions = {
	default: async ({ request, cookies, locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (!session) {
			error(401, "Unauthorized");
		}

		const data = await request.formData();
		const verifierResponse = verifyQuizForm(data);

		if (verifierResponse.fails != null) {
			return fail(400, { fails: verifierResponse.fails });
		}

		const quizId = uuidv4();

		const quiz = await supabase.from("quiz").insert({
			id: quizId,
			name: verifierResponse.quizName!,
			question_set: verifierResponse.quizSet,
			quiz_length: verifierResponse.quizSet.length,
			user_id: session.user.id
		});

		if (quiz.error) {
			redirect("/", { type: "error", message: "Quiz failed to be created" }, cookies);
		}

		redirect("/", { type: "success", message: "Quiz created successfully" }, cookies);
	}
};
