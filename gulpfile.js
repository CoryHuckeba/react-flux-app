"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect');			// Runs a local dev server
var open = require('gulp-open');				// Opens a URL in the web browser
var browserify = require('browserify');			// Bundles JS
var reactify = require('reactify');				// Transforms React JSX into JS
var source = require('vinyl-source-stream');	// Use onventional text streams with Gulp
var concat = require('gulp-concat');			// Concatonates files
var lint = require('gulp-eslint');				// Lints JS files, including JSX

var config = {
	port: 9005,
	devBaseUrl: 'http://localhost',
	paths: {
		html: './src/*.html',
		css: [
			'node_modules/bootstrap/dist/css/bootstrap.min.css',
			'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
			'node_modules/toastr/toastr.css'
		],
		js: './src/**/*.js',
		images: './src/images/*',
		mainJs: './src/main.js',
		dist: './dist'
	}
};

// Start a local dev server 
gulp.task('connect', function() {
	connect.server({
		root: ['dist'],
		port: config.port,
		base: config.devBaseUrl,
		livereload: true
	});
});

// Open a given file in the dev server
gulp.task('open', ['connect'], function() {
	gulp.src('dist/index.html')
		.pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}));

});

// Sends HTML files to dist folder and reload
gulp.task('html', function() {
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
});

gulp.task('js', function() {
	browserify(config.paths.mainJs)
		.transform(reactify)
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload());
})

gulp.task('css', function() {
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist + '/css'));
})

gulp.task('images', function() {
	gulp.src(config.paths.images)
		.pipe(gulp.dest(config.paths.dist + '/images'))
		.pipe(connect.reload());

	gulp.src('./src/favicon.ico')
		.pipe(gulp.dest(config.paths.dist));
})

gulp.task('watch', function() {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js', 'lint']);
});

gulp.task('lint', function() {
	return gulp.src(config.paths.js)
		.pipe(lint({config: 'eslint.config.json'}))
		.pipe(lint.format());
})

// Default gulp task
gulp.task('default', ['html', 'css', 'images', 'js', 'lint', 'open', 'watch']);