/** @format */
/**
 * External dependencies
 */
import page from 'page';

/**
 * Internal dependencies
 */
import { likes } from './controller';
import { preloadReaderBundle, initAbTests, updateLastRoute, sidebar } from 'reader/controller';
import { makeLayout, redirectLoggedOut, render as clientRender } from 'controller';

export default function() {
	page(
		'/activities/likes',
		redirectLoggedOut,
		preloadReaderBundle,
		initAbTests,
		updateLastRoute,
		sidebar,
		likes,
		makeLayout,
		clientRender
	);
}
