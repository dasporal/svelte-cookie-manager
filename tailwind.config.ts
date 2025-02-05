import type { Config } from 'tailwindcss';

export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				dark: '#0f172a',
				cardstart: '#111827',
				cardend: '#080d17',
				light: '#f1f5f9',
				gray: '#9ca3af',
				accent: '#d8b4fe',
				purple: '#a78bfa',
				accentred: '#ef4444',
				accentamber: '#f59e0b',
				accentgreen: '#10b981',
				borderlight: 'rgba(135, 152, 181, 0.227)',
				gradienttop: 'rgba(218, 128, 240, 0.647)',
				gradientbottom: 'rgba(99, 102, 241, 0.6)',
				backgroundcolor: '#1e293b',
				backgroundhovercolor: '#334155'
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
