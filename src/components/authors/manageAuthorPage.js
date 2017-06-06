"use strict";

var React = require('react');
var Router = require('react-router');
var AuthorForm = require('./authorForm');
var AuthorAPI = require('../../api/authorApi');
var toastr = require('toastr');

var ManageAuthorPage = React.createClass({
	
	mixins: [
		Router.Navigation
	],

	getInitialState: function() {
		return {
			author: { id: '', firstName: '', lastName: ''},
			errors: {}
		};
	},

	setAuthorState: function(event) {
		var field = event.target.name;
		var value = event.target.value;

		this.state.author[field] = value;
		return this.setState({author: this.state.author});
	},

	authorFormIsValid: function() {
		var validForm = true;
		this.state.errors = {};	// Clear any previous errors

		// Check first name
		if (this.state.author.firstName < 3) {
			this.state.errors.firstName = "First name must be at least 3 characters.";
			validForm = false;
		}

		// Check last name
		if (this.state.author.lastName < 3) {
			this.state.errors.lastName = "Last name must be at least 3 characters.";
			validForm = false;
		}

		this.setState({errors: this.state.errors});
	},

	saveAuthor: function(event) {

		// Validate form input
		if (!this.authorFormIsValid()) {
			return;
		}

		event.preventDefault();
		AuthorAPI.saveAuthor(this.state.author);
		toastr.success('Author Saved!');
		this.transitionTo('authors');
	},

	render: function() {
		return (
			<div>
				<h1>Manage Author</h1>
				<div className="container-fluid">
					<AuthorForm 
						author={this.state.author}
						onChange={this.setAuthorState}
						onSave={this.saveAuthor} 
						errors={this.state.errors} />
				</div>
			</div>
		);
	}
});

module.exports = ManageAuthorPage;