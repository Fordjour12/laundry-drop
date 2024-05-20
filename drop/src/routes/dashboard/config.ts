import type { Icon } from "lucide-svelte";
import { type ComponentType } from "svelte";
import * as Icons from "./icons.js";

export type Route = {
    name: string;
    url: string;
    icon: ComponentType<Icon>;
    label: string;
    variant: "default" | "ghost";
}

export const menuRoutes: Route[] = [
    {
        name: "My Dashboard",
        url: "/dashboard",
        label: "128",
        icon: Icons.Archive,
        variant: "default",
    },
    {
        name: "Drafts",
        url: "",
        label: "9",
        icon: Icons.CircleAlert,
        variant: "ghost",
    }, {
        name: "Hello",
        url: "/dashboard/hello",
        icon: Icons.Ampersand,
        variant: "ghost",
        label: "New"
    }, {
        name: "Hello2",
        url: "/dashboard/hello2",
        icon: Icons.Airplay,
        variant: "ghost",
        label: "New"
    }
]
