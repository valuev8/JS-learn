'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require("browser-sync"),
    eslint = require("eslint"),
    notify = require("gulp-notify"),
    rigger = require('gulp-rigger'),
    rimraf = require('rimraf'),
    cssmin = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    reload = browserSync.reload;

//-------- Paths --------

var path = {
    build: { 
        html: 'build/',
        js: 'build/js/',
        css: 'build/style/',
        img: 'build/images/',
        fonts: 'build/fonts/'
    },
    src: { 
        html: 'src/*.html', 
        js: 'src/js/main.js',
        style: 'src/style/main.scss',
        img: 'src/images/**/*.*', 
        fonts: 'src/fonts/**/*.*'
    },
    watch: { 
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.scss',
        img: 'src/images/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};

//-------- Dev Server --------

var config = {
  server: {
		baseDir: "./build"
  },
  host: 'localhost',
	port: 9000,
	notify: false
};

//-------- Building HTML --------

gulp.task('html:build', function () {
  gulp.src(path.src.html) 
		.pipe(rigger()) 
		.pipe(gulp.dest(path.build.html))
		.pipe(reload({stream: true}));
});

//-------- Building JS --------

gulp.task('js:build', function () {
	gulp.src(path.src.js)
		.pipe(rigger()) 
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build.js)) 
		.pipe(reload({stream: true}));
});

//-------- Building CSS --------

gulp.task('style:build', function () {
	gulp.src(path.src.style) 
		.pipe(sourcemaps.init())
		.pipe(sass())
		.on( 'error', notify.onError(
      {
        message: "<%= error.message %>",
				title  : "SASS Error!"
			}))
		.pipe(prefixer()) 
    .pipe(cssmin()) 
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build.css))
		.pipe(reload({stream: true}));
});

//-------- Moving fonts --------

gulp.task('fonts:build', function() {
	gulp.src(path.src.fonts)
			.pipe(gulp.dest(path.build.fonts))
});

//-------- Compress Img --------

gulp.task('image:build', function () {
	gulp.src(path.src.img) 
		.pipe(imagemin({ 
				progressive: true,
				svgoPlugins: [{removeViewBox: false}],
				use: [pngquant()],
				interlaced: true
		}))
		.pipe(gulp.dest(path.build.img))
		.pipe(reload({stream: true}));
});

//-------- Eslint --------

gulp.task('lint', function () {
  return gulp.src(['**/*.js','!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

//-------- Combining build --------

gulp.task('build', [
	'html:build',
	'js:build',
	'style:build',
	'fonts:build',
	'image:build'
]);

//-------- Wathcing files --------

gulp.task('watch', function(){
	watch([path.watch.html], function(event, cb) {
		gulp.start('html:build');
	});
	watch([path.watch.style], function(event, cb) {
		gulp.start('style:build');
	});
	watch([path.watch.js], function(event, cb) {
		gulp.start('js:build');
	});
	watch([path.watch.img], function(event, cb) {
		gulp.start('image:build');
	});
	watch([path.watch.fonts], function(event, cb) {
		gulp.start('fonts:build');
	});
});

//-------- Dev Server --------

gulp.task('webserver', function () {
	browserSync(config);
});

//-------- Cleaning build --------

gulp.task('clean', function (cb) {
	rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);