// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var prettify = require('gulp-jsbeautifier');

var bases = {
 src: 'src/',
 dist: 'dist/',
};

var paths = {
 scripts: ['js/**/*.js', 'jasmine/**/*.js', '!jasmine/lib/**/*.*'],
 jasmine: ['jasmine/**/*.js', '!jasmine/lib/**/*.*'],
 libs: ['jasmine/lib/**/*.*'],
 styles: ['css/**/*.css'],
 html: ['index.html'],
 fonts: ['fonts/**/*.*']
};



// Lint Task
gulp.task('lint', function() {
    return gulp.src(paths.scripts, {cwd:bases.src})
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Prettify JavaScript, JSON, HTML and CSS.
gulp.task('prettify', function() {
  gulp.src(paths.jasmine, {cwd: bases.src})
    .pipe(prettify())
    .pipe(gulp.dest(bases.src + 'jasmine/'));
});

// Delete the dist directory
gulp.task('clean', function() {
 return gulp.src(bases.dist)
 .pipe(clean());
});

// Minify CSS
gulp.task('minify-css', function() {
  return gulp.src(paths.styles, {cwd: bases.src})
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(bases.dist + 'css/'));
});

// Concatenate & Minify JS in src/js and src/jasmine
gulp.task('scripts', function() {
    return gulp.src(paths.scripts, {cwd: bases.src})
        .pipe(concat('all.js'))
        .pipe(gulp.dest(bases.dist + 'js/'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(bases.dist + 'js/'));
});

// Copy all other files to dist directly
gulp.task('copy', function() {
 // Copy html
 gulp.src(paths.html, {cwd: bases.src})
 .pipe(gulp.dest(bases.dist));
 // Copy fonts
 gulp.src(paths.fonts, {cwd: bases.src})
 .pipe(gulp.dest(bases.dist + 'fonts/'));
  // Copy jasmine lib
 gulp.src(paths.libs, {cwd: 'src/**'})
 .pipe(gulp.dest(bases.dist));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('jasmine/spec/*.js', ['lint', 'scripts']);
    gulp.watch('css/*.css', ['minify-css']);
});

// Default Task
gulp.task('default', ['minify-css', 'scripts', 'copy']);