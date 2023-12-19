import type { Handle } from "@sveltejs/kit";

const handleTheme = (async ({ event, resolve }) => {
	const theme = event.cookies.get("theme");

	if (theme) {
		return await resolve(event, {
			transformPageChunk: ({ html }) => html.replace('data-theme=""', `data-theme="${theme}"`)
		});
	}
	return await resolve(event);
}) satisfies Handle;

export const handle = handleTheme;
