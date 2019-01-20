/** @format **/

/**
 * External dependencies
 */
import i18n from 'i18n-calypso';
import { get } from 'lodash';

// For now the site style step will determine which 'style pack' to use on pub/radcliffe-2
export const siteStyleOptions = {
	business: [
		{
			description: i18n.translate(
				'A bright, versatile canvas, offering a crisp reading experience for visitors.',
				{
					comment: 'A description of a WordPress theme style.',
				}
			),
			id: 'default',
			label: 'Classic',
			theme: 'pub/professional2019',
			font: {
				name: 'Crimson Text',
				// variations in fvd format: https://github.com/typekit/fvd
				variations: [ 'n4', 'n7' ],
			},
		},
		{
			description: i18n.translate(
				'The power of minimalism, embodied in a clean black-and-white design.',
				{
					comment: 'A description of a WordPress theme style.',
				}
			),
			id: 'modern',
			label: 'Modern',
			theme: 'pub/dusk2019',
			font: {
				name: 'Poppins',
				variations: [ 'n4', 'n7' ],
			},
		},
		{
			description: i18n.translate(
				'Timeless, simple elegance, with classic fonts and a touch of sepia.',
				{
					comment: 'A description of a WordPress theme style.',
				}
			),
			id: 'vintage',
			label: 'Vintage',
			theme: 'pub/elegant2019',
			font: {
				name: 'Source Serif Pro',
				variations: [ 'n4', 'n7' ],
			},
		},
		{
			description: i18n.translate(
				'For an extra layer of playfulness, from bold color palettes to a vibrant font.',
				{
					comment: 'A description of a WordPress theme style.',
				}
			),
			id: 'colorful',
			label: 'Upbeat',
			theme: 'pub/friendly2019',
			font: {
				name: 'Rubik',
				variations: [ 'n4', 'n7' ],
			},
		},
	],
};

export const getSiteStyleOptions = siteType =>
	get( siteStyleOptions, siteType, siteStyleOptions.business );
