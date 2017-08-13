// Load dependencies
const watch  = require('gulp-watch');
const cache  = require('gulp-cached');
const debug  = require('gulp-debug');
const gulp   = require('gulp');
const raster = require('gulp-raster');
const rename = require('gulp-rename');
const svgmin = require('gulp-svgmin');
const xmlval = require('gulp-xml-validator');

// Files
const svgFiles = [
    'src/**/*.svg'
];

// SVG Minification
gulp.task('build:svg', gulp.series( done => {
    return gulp.src(svgFiles)
    .pipe(cache('build:svg'))
    .pipe(debug({title: 'svgmin:'}))
    .pipe(svgmin())
    .pipe(gulp.dest('build/'));

    done();
}));

// Convert SVG to PNG
gulp.task('build:png', gulp.series( done => {
    return gulp.src(svgFiles)
    .pipe(cache('build:png'))
    .pipe(debug({title: 'raster:'}))
    .pipe(raster({format: 'png'}))
    .pipe(rename({extname: '.png'}))
    .pipe(gulp.dest('build/'));

    done();
}));

// Watch task
gulp.task('watch:svg', gulp.series( done => {
    gulp.watch(svgFiles, gulp.series('build:svg'));

    done();
}));

// Validate XML
gulp.task('lint:xml', gulp.series( done => {
  return gulp.src(svgFiles)
    .pipe(debug({title: 'lint:xml'}))
    .pipe(xmlval());

    done();
}));

// Available tasks
gulp.task('build', gulp.parallel('build:svg'));
gulp.task('watch', gulp.parallel('watch:svg'));