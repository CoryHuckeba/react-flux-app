"use strict";

var React = require('react');
var AuthorApi = require('../../api/AuthorApi');
var AuthorList = require('./authorList');

var Authors = React.createClass({

	getInitialState: function() {
		return {
			authors: []
		};
	},

	componentDidMount: function() {
		
		if (this.isMounted()) {
			this.setState({
				// Mock API call, in a real app this would be an async HTTP call
				authors: AuthorApi.getAllAuthors()
			});
		}
	},

	render: function () {		
		return (
			<div>
				<h1>Authors</h1>
				<AuthorList authors={this.state.authors} />
			</div>	
		);
	}
});

module.exports = Authors;