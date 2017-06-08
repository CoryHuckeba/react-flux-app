"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var AuthorAPI = require('../api/authorApi');
var ActionTypes = require('../constants/actionTypes');

var AuthorActions = {
	createAuthor: function(author) {
		var newAuthor = AuthorAPI.saveAuthor(author);
		
		// Alert stores that an author entity has been created
		Dispatcher.dispatch({
			actionType: ActionTypes.CREATE_AUTHOR,
			author: newAuthor
		});
	},

	editAuthor: function(author) {
		var updatedAuthor = AuthorAPI.saveAuthor(author);
		
		// Alert stores that an author entity has been created
		Dispatcher.dispatch({
			actionType: ActionTypes.EDIT_AUTHOR,
			author: updatedAuthor
		});
	},

	deleteAuthor: function(id) {
		AuthorAPI.deleteAuthor(id);

		Dispatcher.dispatch({
			actionType: ActionTypes.DELETE_AUTHOR,
			id: id
		});
	}

};

module.exports = AuthorActions;