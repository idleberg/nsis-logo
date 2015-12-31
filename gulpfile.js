// Load dependencies
var watch    = require('gulp-watch');
var cache    = require('gulp-cached');
var debug    = require('gulp-debug');
var gulp     = require('gulp');
var raster   = require('gulp-raster');
var rename   = require('gulp-rename');
var svgmin   = require('gulp-svgmin');

// Tasks
gulp.task('generate', ['generate:svg', 'generate:png']);


// Global Variable
const __svg = [
    'src/**/*.svg'
];

// SVG Minification
gulp.task('generate:svg', function() {
    return gulp.src(__svg)
    .pipe(cache('generate:svg'))
    .pipe(debug({title: 'svgmin:'}))
    .pipe(svgmin())
    .pipe(gulp.dest('build/'));
});

// Convert SVG to PNG
gulp.task('generate:png', function () {
    return gulp.src(__svg)
    .pipe(cache('generate:png'))
    .pipe(debug({title: 'raster:'}))
    .pipe(raster({format: 'png'}))
    .pipe(rename({extname: '.png'}))
    .pipe(gulp.dest('build/'));
});

// Watch task
gulp.task('watch', function () {
    gulp.watch(__svg,['generate']);
});