import type { LayoutServerData } from "./$types";

export const load: LayoutServerData = async ({ locals: { getSession } }: any) => {
	return {
		session: await getSession()
	};
};
