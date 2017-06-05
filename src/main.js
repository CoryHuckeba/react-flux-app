"use strict";

global.$ = global.jQuery = require('jquery');
var React = require('react');
var Home = require('./components/homepage');

React.render(<Home></Home>, document.getElementById('app'));


