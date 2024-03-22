import type { Icon } from "lucide-svelte";
import type { ComponentType } from "svelte";
import * as Icons from "./icons.js";

export type MenuRoute = {
	url: string;
	name: string;
	icon: ComponentType<Icon>;
};

export const pageRoutes: MenuRoute[] = [
	{
		url: "/",
		name: "My Dashboard",
		icon: Icons.Home
	}

];
