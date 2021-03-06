(function() {
	'use strict';
	module.exports = React.createClass({
		render: function() {
			/* Components */
			var Timer = require('./timer/wrapper.jsx');
			/* JSX */
			return (
				<div>
					<p style={{
						fontSize: "1.5em"
					}}>{this.props.message}</p>
					<Timer time={this.props.time} formatter={this.props.formatter}/>
				</div>
			);
		}
	});
}());
