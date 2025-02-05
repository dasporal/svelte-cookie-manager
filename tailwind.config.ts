import type { Config } from 'tailwindcss';

export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				dark: 'var(--dark)',
				cardstart: 'var(--cardstart)',
				cardend: 'var(--cardend)',
				light: 'var(--light)',
				gray: 'var(--gray)',
				accent: 'var(--accent)',
				purple: 'var(--purple)',
				accentred: 'var(--accentred)',
				accentamber: 'var(--accentamber)',
				accentgreen: 'var(--accentgreen)',
				borderlight: 'var(--borderlight)',
				gradienttop: 'var(--gradienttop)',
				gradientbottom: 'var(--gradientbottom)',
				backgroundcolor: 'var(--backgroundcolor)',
				backgroundhovercolor: 'var(--backgroundhovercolor)'
			}
		}
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
