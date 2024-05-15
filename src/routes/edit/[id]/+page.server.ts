import { error, type Actions, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { QuestionSchemaType } from "$lib/shared";
import { verifyQuizForm } from "$lib/db/form";
import { redirect } from "sveltekit-flash-message/server";

export const load: PageServerLoad = async ({ params, locals: { supabase, getSession } }) => {
	const session = await getSession();
	if (!session) {
		error(401, "Unauthorized");
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
	edit: async ({ request, url, cookies, locals: { supabase, getSession } }) => {
		const session = await getSession();

		if (!session) {
			error(404, "Not found");
		}

		const data = await request.formData();
		const verifierResponse = verifyQuizForm(data);

		if (verifierResponse.fails != null) {
			return fail(400, { fails: verifierResponse.fails });
		}

		const quizId = url.pathname.substring(url.pathname.lastIndexOf("/") + 1).trim();

		const quiz = await supabase
			.from("quiz")
			.update({
				name: verifierResponse.quizName!,
				question_set: verifierResponse.quizSet,
				quiz_length: verifierResponse.quizSet.length
			})
			.eq("id", quizId);

		if (quiz.error) {
			error(500, "Server error");
		}

		redirect("/", { type: "success", message: "Quiz updated successfully" }, cookies);
	},

	delete: async ({ params, cookies, locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (!session) {
			error(401, "Unauthorized");
		}

		if (!params.id) {
			error(404, "Quiz ID not found");
		}

		const { data, error: err } = await supabase.from("quiz").select("user_id").eq("id", params.id);

		if (err) error(500, "Server Error");
		if (!data) error(404, "Not found");

		if (data[0].user_id !== session.user.id) {
			error(401, "Unauthorized");
		}

		const { error: deleteErr } = await supabase.from("quiz").delete().eq("id", params.id);

		if (deleteErr) {
			error(500, "Server Error");
		}

		redirect("/", { type: "success", message: "Quiz deleted successfully" }, cookies);
	}
};
