import React from 'react';
import styles from './DividerWidget.scss';

class DividerWidget extends React.Component {
	render() {
		return (
			<hr className={styles.divider}/>
		);
	}
}

export default {
    Component: DividerWidget,
	extend: function() {
		return {
			eval: function(state) {
				return null;
			},
            isTouchable: false
		}
	}
};
