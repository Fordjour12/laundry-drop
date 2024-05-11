import aspectRatio from "@tailwindcss/aspect-ratio";
import svgToDataUri from "mini-svg-data-uri";
import { fontFamily } from "tailwindcss/defaultTheme";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";

/** @type {import('tailwindcss').Config} */
const config = {
	darkMode: ["class"],
	content: ["./src/**/*.{html,js,svelte,ts}"],
	safelist: ["dark"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				border: "hsl(var(--border) / <alpha-value>)",
				input: "hsl(var(--input) / <alpha-value>)",
				ring: "hsl(var(--ring) / <alpha-value>)",
				background: "hsl(var(--background) / <alpha-value>)",
				foreground: "hsl(var(--foreground) / <alpha-value>)",
				primary: {
					DEFAULT: "hsl(var(--primary) / <alpha-value>)",
					foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
					foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
					foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
				},
				muted: {
					DEFAULT: "hsl(var(--muted) / <alpha-value>)",
					foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
				},
				accent: {
					DEFAULT: "hsl(var(--accent) / <alpha-value>)",
					foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
				},
				popover: {
					DEFAULT: "hsl(var(--popover) / <alpha-value>)",
					foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
				},
				card: {
					DEFAULT: "hsl(var(--card) / <alpha-value>)",
					foreground: "hsl(var(--card-foreground) / <alpha-value>)",
				},
				"app-primary": {
					100: "#03301f",
					200: "#204434",
					300: "#3a594a",
					400: "#546f61",
					500: "#6e867a",
					600: "#8a9d93",
				},
				"app-surface": {
					100: "#242424",
					200: "#383838",
					300: "#4e4e4e",
					400: "#656565",
					500: "#7d7d7d",
					600: "#959595",
				},
				"app-mixed": {
					100: "#202723",
					200: "#353b38",
					300: "#4b514d",
					400: "#626764",
					500: "#7a7f7c",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			fontFamily: {
				sans: [...fontFamily.sans],
				SchibstedGrotesk: ["Schibsted Grotesk", "sans-serif"],
			},
			fontSize: {
				sm: "clamp(0.8rem, 0.16vi + 0.76rem, 0.89rem)",
				base: "clamp(1rem, 0.33vi + 0.93rem, 1.19rem)",
				lg: "clamp(1.25rem, 0.58vi + 1.12rem, 1.58rem)",
				xl: "clamp(1.56rem, 0.95vi + 1.35rem, 2.11rem)",
				"2xl": "clamp(1.95rem, 1.49vi + 1.62rem, 2.81rem)",
				"3xl": "clamp(2.44rem, 2.27vi + 1.93rem, 3.75rem)",
				"4xl": "clamp(3.05rem, 3.38vi + 2.29rem, 5rem)",
				"5xl": "clamp(3.81rem, 4.95vi + 2.7rem, 6.66rem)",
				"6xl": "clamp(4.77rem, 7.15vi + 3.16rem, 8.88rem)",
				"7xl": "clamp(5.96rem, 10.22vi + 3.66rem, 11.84rem)",
				"8xl": "clamp(7.45rem, 14.49vi + 4.19rem, 15.78rem)",
				"9xl": "clamp(9.31rem, 20.39vi + 4.73rem, 21.03rem)",
				"10xl": "clamp(11.64rem, 28.52vi + 5.23rem, 28.04rem)",
				"11xl": "clamp(14.55rem, 39.69vi + 5.62rem, 37.38rem)",
				"12xl": "clamp(18.19rem, 55.01vi + 5.81rem, 49.82rem)",
				"13xl": "clamp(22.74rem, 75.96vi + 5.65rem, 66.41rem)",
			},
		},
	},
	plugins: [
		aspectRatio,
		addVariablesForColors,
		({ matchUtilities, theme }) => {
			matchUtilities(
				{
					"bg-grid": (value) => ({
						backgroundImage: `url("${svgToDataUri(
							`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`,
						)}")`,
					}),
					"bg-grid-small": (value) => ({
						backgroundImage: `url("${svgToDataUri(
							`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`,
						)}")`,
					}),
					"bg-dot": (value) => ({
						backgroundImage: `url("${svgToDataUri(
							`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`,
						)}")`,
					}),
				},
				{
					values: flattenColorPalette(theme("backgroundColor")),
					type: "color",
				},
			);
		},
	],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
	const allColors = flattenColorPalette(theme("colors"));
	const newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
	);

	addBase({
		":root": newVars,
	});
}

export default config;
