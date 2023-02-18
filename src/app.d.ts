// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			userId?: any,
			theme: string
		}
		// interface PageData {}
		interface Platform {
			env: any
		}
	}
}

export {};
