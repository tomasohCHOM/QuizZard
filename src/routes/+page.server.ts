import type { Tables } from "../lib/db/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const quizzes = await supabase.from("quiz").select("").returns<Tables<"quiz">[]>();

	return { quizzes: quizzes.data ?? [] };
};
