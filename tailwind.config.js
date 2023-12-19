/** @type {import("tailwindcss").Config} */
export default {
	content: ["./src/**/*.{html,js,ts,svelte}"],
	theme: {
		extend: {
			colors: {
				"color-primary": "var(--color-primary)",
				"color-secondary": "var(--color-secondary)",
				"color-contrast": "var(--color-contrast)"
			},
			fontFamily: {
				general: "var(--ff-general)",
				code: "var(--ff-code)"
			}
		}
	},
	plugins: []
};
