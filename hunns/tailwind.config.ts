import { join } from 'path';
import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/tw-plugin';
import { hunnsWedding } from './src/hunnsWedding';

export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {},
		fontFamily: {
			avenir: ['Avenir LT Std'],
			belganAesthetic: ['Belgan Aesthetic'],
			didotHTF: ['Didot HTF'],
			cormorantG: ['CormorantGaramond']
		}
	},
	plugins: [
		forms,
		typography,
		skeleton({
			themes: {
				custom: [hunnsWedding]
			}
		})
	]
} satisfies Config;
