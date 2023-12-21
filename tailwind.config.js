const plugin = require("tailwindcss/plugin");

/** @type {import("tailwindcss").Config} */
export default {
	content: ["./src/**/*.{html,js,ts,svelte}"],
	theme: {
		extend: {
			colors: {
				primary: "rgb(var(--color-primary))",
				secondary: "rgb(var(--color-secondary))",
				contrast: "rgb(var(--color-contrast))"
			},
			fontFamily: {
				general: "var(--ff-general)",
				code: "var(--ff-code)"
			}
		}
	},
	plugins: [
		plugin(({ addVariant }) => {
			addVariant("dark", '&html[data-theme="dark"]');
		})
	]
};
