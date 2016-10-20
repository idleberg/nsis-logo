// Load dependencies
const watch    = require('gulp-watch');
const cache    = require('gulp-cached');
const debug    = require('gulp-debug');
const gulp     = require('gulp');
const raster   = require('gulp-raster');
const rename   = require('gulp-rename');
const svgmin   = require('gulp-svgmin');
const xmlval   = require('gulp-xml-validator');

// Tasks
gulp.task('generate', ['generate:svg', 'generate:png']);
gulp.task('lint', ['lint:xml']);


// Global Variable
const __svg = [
    'src/**/*.svg'
];

const __xml = [
    'src/**/*.svg',
    'src/**/*.xml'
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

// Validate XML
gulp.task('lint:xml', function() {
  return gulp.src(__xml)
    .pipe(debug({title: 'lint:xml'}))
    .pipe(xmlval  ());
});