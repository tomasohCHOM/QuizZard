import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from "$env/static/public";
import type { Handle } from "@sveltejs/kit";
import { createServerClient } from "@supabase/ssr";
import { sequence } from "@sveltejs/kit/hooks";

export const createClient: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		cookies: {
			get: (key) => event.cookies.get(key),
			set: (key, value, options) => event.cookies.set(key, value, options as any),
			remove: (key, options) => event.cookies.delete(key, options as any)
		}
	});

	/**
	 * a little helper that is written for convenience so that instead
	 * of calling `const { data: { session } } = await supabase.auth.getSession()`
	 * you just call this `await getSession()`
	 */
	event.locals.getSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		return session;
	};

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === "content-range";
		}
	});
};

const handleTheme = (async ({ event, resolve }) => {
	const theme = event.cookies.get("theme");

	if (theme) {
		return await resolve(event, {
			transformPageChunk: ({ html }) => html.replace('data-theme=""', `data-theme="${theme}"`)
		});
	}
	return await resolve(event);
}) satisfies Handle;

export const handle = sequence(createClient, handleTheme);
