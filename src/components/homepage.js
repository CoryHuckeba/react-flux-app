"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Home = React.createClass({
	render: function() {
		return (
			<div className="jumbotron">
				<h1>Pluralsight Administration</h1>
				<p>React, React Router, Flux for ultra responsive webapps.</p>
				<Link to="about" className="btn btn-primary btn-lg">Learn More</Link>
			</div>
		);
	}
});

module.exports = Home;