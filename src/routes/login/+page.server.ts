import type { Provider } from "@supabase/supabase-js";
import { fail, redirect, type Actions } from "@sveltejs/kit";

const OAUTH_PROVIDERS = ["github", "discord"];

export const actions = {
	login: async ({ request, url, locals: { supabase } }) => {
		const provider = url.searchParams.get("provider") as Provider;

		if (provider) {
			if (!OAUTH_PROVIDERS.includes(provider)) {
				return fail(400, {
					message: "Provider not supported"
				});
			}
			const { data, error: err } = await supabase.auth.signInWithOAuth({
				provider: provider
			});

			if (err) {
				console.error(err);
				return fail(400, {
					message: "Something went wrong."
				});
			}
			throw redirect(303, data.url);
		}
	}
} satisfies Actions;
