import { writable } from "svelte/store";

export const activeNavItems = writable<number | null>(1);
