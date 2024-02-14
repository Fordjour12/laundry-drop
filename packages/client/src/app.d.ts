// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

type Company = {
	name: string;
	email: string;
};

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session: string | null;
			company: Company | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
