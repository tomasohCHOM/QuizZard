import { error, type Actions, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { QuestionSchemaType } from "$lib/shared";
import { verifyQuizForm } from "$lib/db/form";
import { redirect } from "sveltekit-flash-message/server";
import { sleep } from "$lib/shared/sleep";

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
	edit: async ({ request, params, cookies, locals: { supabase, getSession } }) => {
		await sleep(1000);

		const quizId = params.id;
		if (!quizId) {
			error(404, "Quiz ID not found");
		}

		const session = await getSession();
		const { data: userIdData, error: userIdError } = await supabase
			.from("quiz")
			.select("user_id")
			.eq("id", quizId);

		if (userIdError) error(500, "Server Error");
		if (!userIdData) error(404, "Not found");

		if (!session || userIdData[0].user_id !== session.user.id) {
			error(401, "Unauthorized");
		}

		const data = await request.formData();
		const verifierResponse = verifyQuizForm(data);

		if (verifierResponse.fails != null) {
			return fail(400, { fails: verifierResponse.fails });
		}

		const edit = await supabase
			.from("quiz")
			.update({
				name: verifierResponse.quizName!,
				question_set: verifierResponse.quizSet,
				quiz_length: verifierResponse.quizSet.length
			})
			.eq("id", quizId);

		if (edit.error) {
			redirect("/", { type: "error", message: "Could not save quiz changes" }, cookies);
		}

		redirect("/", { type: "success", message: "Quiz updated successfully" }, cookies);
	},

	delete: async ({ params, cookies, locals: { supabase, getSession } }) => {
		await sleep(1000);

		const quizId = params.id;
		if (!quizId) {
			error(404, "Quiz ID not found");
		}

		const session = await getSession();
		const { data, error: err } = await supabase.from("quiz").select("user_id").eq("id", quizId);

		if (err) error(500, "Server Error");
		if (!data) error(404, "Not found");

		if (!session || data[0].user_id !== session.user.id) {
			error(401, "Unauthorized");
		}

		const { error: deleteErr } = await supabase.from("quiz").delete().eq("id", quizId);

		if (deleteErr) {
			redirect("/", { type: "error", message: "Could not delete the quiz" }, cookies);
		}

		redirect("/", { type: "success", message: "Quiz deleted successfully" }, cookies);
	}
};
