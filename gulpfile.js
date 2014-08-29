var gulp        = require('gulp'),
   	uglify 		= require('gulp-uglify'),
   	jshint 		= require('gulp-jshint'),
   	concat 		= require('gulp-concat'),
    sass        = require('gulp-sass'),
    imagemin    = require('gulp-imagemin'),
    pngcrush    = require('imagemin-pngcrush'),
    cssmin      = require('gulp-cssmin'),
    uncss       = require('gulp-uncss'),
    nodemon     = require('gulp-nodemon'),
    say         = require('say'),
    prefix      = require('gulp-autoprefixer'),
   	browserSync = require('browser-sync'),
    reload      = browserSync.reload;



// JS: uglify all JS files and concat
gulp.task('js', function () {
   	return gulp.src('public/js/src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(uglify())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('public/js'))
    .pipe(browserSync.reload({stream:true, once: true}));
});


// Sass task, will run when any SCSS files change & BrowserSync will auto-update browsers
// TO DO: run uncss on this stream as well
gulp.task('sass', function () {
	console.log('sass')
  	return gulp.src('public/styles/scss/*.scss')
	.pipe(sass({outputStyle: 'compressed'}, {errLogToConsole: true}))
  	.pipe(prefix("last 2 versions", "> 1%", "ie 8", "Android 2", "Firefox ESR"))
  	.pipe(gulp.dest('public/styles'))
  	.pipe(reload({stream:true}));
});


// Image minification
gulp.task('imagemin', function () {
    return gulp.src('public/img/*.*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest('public/img/min'));
});


// Browser Sync: Start Nodemon, then init BrowserSync 
gulp.task('browser-sync', ['nodemon'], function () {
    var files = [
    	'public/styles/style.css',
    	'public/img/**/*.png',
    	'public/img/**/*.jpg',
    	'public/js/main.js'
    ];

    browserSync.init(files, {
      	proxy: "http://localhost:5000"
    });
});


// Nodemon
gulp.task('nodemon', function (cb) {
	var called = false;
	return nodemon({script: 'app.js'}).on('start', function () {
		if (!called) {
			called = true;
			cb();
		}
	});
});







// Watch different file types, doing different things with each.
gulp.task('default', ['sass', 'browser-sync'], function() {
  	gulp.watch("public/styles/scss/**/*.scss", ['sass']);
  	gulp.watch("views/*.jade", reload);
  	gulp.watch("public/js/src/*.js", ['js']);
  	gulp.watch("public/img/*.*", ['imagemin']);  
});
