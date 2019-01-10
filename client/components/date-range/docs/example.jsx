/** @format */

/**
 * External dependencies
 */

import React, { Fragment, Component } from 'react';

/**
 * Internal dependencies
 */
import Card from 'components/card';
import DateRange from '../index.js';

/*
 * Date Range Demo
 */
class DateRangeExample extends Component {
	render() {
		const now = new Date();

		return (
			<Fragment>
				<Card style={ { width: '300px', margin: 0 } }>
					<h3>Defaults</h3>
					<DateRange />
				</Card>

				<Card style={ { width: '300px', margin: 0 } }>
					<h3>Select only past dates</h3>
					<DateRange lastSelectableDate={ now } />
				</Card>

				<Card style={ { width: '300px', margin: 0 } }>
					<h3>Select only future dates</h3>
					<DateRange firstSelectableDate={ now } />
				</Card>
			</Fragment>
		);
	}
}

DateRangeExample.displayName = 'DateRange';

export default DateRangeExample;