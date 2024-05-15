import type { Session, SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./lib/db/types";

// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient<Database>;
			getSession(): Promise<Session | null>;
		}
		interface PageData {
			session: Session | null;
			flash?: { type: "success" | "error"; message: string };
		}
		// interface Error {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
