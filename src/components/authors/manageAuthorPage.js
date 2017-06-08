"use strict";

var React = require('react');
var Router = require('react-router');
var AuthorForm = require('./authorForm');
var AuthorActions = require('../../actions/authorActions');
var AuthorStore = require('../../stores/authorStore');
var toastr = require('toastr');

var ManageAuthorPage = React.createClass({
	
	mixins: [
		Router.Navigation
	],

	statics: {
		willTransitionFrom: function(transition, component) {
			if (component.state.dirty && !confirm('Leave without saving data?')) {
				transition.abort();
			}
		}
	},

	getInitialState: function() {
		return {
			author: { id: '', firstName: '', lastName: ''},
			errors: {},
			dirty: false
		};
	},

	componentWillMount: function() {
		var authorId = this.props.params.id;

		if (authorId) {
			this.setState({author: AuthorStore.getAuthorById(authorId)});
		}
	},

	setAuthorState: function(event) {
		var field = event.target.name;
		var value = event.target.value;

		this.setState({dirty: true});
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
		return validForm;
	},

	saveAuthor: function(event) {

		// Don't POST the form
		event.preventDefault();

		// Validate form input
		if (!this.authorFormIsValid()) {			
			return;
		}

		if (this.state.author.id) {
			AuthorActions.editAuthor(this.state.author);
		}

		// Update store		
		AuthorActions.createAuthor(this.state.author);

		// Alert user and transition out
		toastr.success('Author Saved!');
		this.transitionTo('authors');
		this.setState({dirty: false});
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