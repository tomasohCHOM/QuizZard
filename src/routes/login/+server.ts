import type { Provider } from "@supabase/supabase-js";
import { error, redirect, type RequestHandler } from "@sveltejs/kit";

const OAUTH_PROVIDERS = ["github", "discord"];

export const POST: RequestHandler = async ({ url, locals: { supabase } }) => {
	const provider = url.searchParams.get("provider") as Provider;
	if (!provider) throw error(404, "Provider not found");
	if (!OAUTH_PROVIDERS.includes(provider)) {
		throw error(400, "Provider not supported");
	}
	const { data, error: err } = await supabase.auth.signInWithOAuth({
		provider: provider
	});

	if (err) {
		throw error(500, "Something went wrong.");
	}
	throw redirect(303, data.url);
};
