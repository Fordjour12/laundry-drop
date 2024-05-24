import type { TypeIcon } from "lucide-svelte";
import type { ComponentType } from "svelte";
import * as Icons from "./icons";
export type RouteConfig = {
	id: number;
	path: string;
	name: string;
	icon: ComponentType<TypeIcon>;
};

export const routesConfig: RouteConfig[] = [
	{
		id: 1,
		path: "/dashboard",
		name: "Dashboard",
		icon: Icons.Home,
	},
	{
		id: 2,
		path: "/dashboard/orders",
		name: "Orders",
		icon: Icons.ShoppingCart,
	},
	{
		id: 3,
		path: "/dashboard/services",
		name: "Services",
		icon: Icons.Package,
	},
	{
		id: 4,
		path: "/dashboard/customers",
		name: "Customers",
		icon: Icons.UserRound,
	},
	{
		id: 5,
		path: "/dashboard/delivery",
		name: "Delivery",
		icon: Icons.Truck,

	}, {
		id: 6,
		path: "/dashboard/messages",
		name: "Messages",
		icon: Icons.Mail,
	},
	{
		id: 7,
		path: "/dashboard/analytics",
		name: "Analytics",
		icon: Icons.LineChart,
	}

];
