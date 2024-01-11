import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const quizzes = await supabase.from("quiz").select();

	return { quizzes: quizzes.data ?? [] };
};
