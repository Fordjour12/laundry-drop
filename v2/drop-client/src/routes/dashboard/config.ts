// import type { Icon } from "lucide-svelte";
import { Airplay, Ampersand, CircleAlert } from "lucide-svelte";
import type { ComponentType } from "svelte";
// import * as Icons from "./icons.js";

export type Route = {
    name: string;
    url: string;
    icon: ComponentType;
    label: string;
    variant: "default" | "ghost";
}

export const menuRoutes: Route[] = [
    {
        name: "My Dashboard",
        url: "/dashboard",
        label: "128",
        icon: Airplay,
        variant: "default",
    },
    { name: "Drafts", url: "", label: "9",
        icon: CircleAlert,
        variant: "ghost",
    }, {
        name: "Hello",
        url: "/dashboard/hello",
        icon: Ampersand,
        variant: "ghost",
        label: "New"
    }, {
        name: "Hello2",
        url: "/dashboard/hello2",
        icon:Airplay,
        variant: "ghost",
        label: "New"
    }
]
