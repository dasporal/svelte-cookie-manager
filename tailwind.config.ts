import type { Config } from 'tailwindcss';

export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	prefix: 'scm-',
	theme: {
		extend: {}
	},

	plugins: [],
	corePlugins: {
		// Disable features we don"t use
		container: false,
		objectFit: false,
		objectPosition: false,
		placeholderColor: false,
		placeholderOpacity: false,
		tableLayout: false
	}
} satisfies Config;
