import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = () => {
	redirect(301, "/my-quizzes/1");
};
