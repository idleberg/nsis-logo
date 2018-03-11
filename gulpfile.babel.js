'use strict';

// Load dependencies
import cache from 'gulp-cached';
import debug from 'gulp-debug';
import gulp from 'gulp';
import raster from 'gulp-raster';
import rename from 'gulp-rename';
import svgmin from 'gulp-svgmin';
import watch from 'gulp-watch';
import xmlval from 'gulp-xml-validator';

// Files
const svgFiles = [
  'src/**/*.svg'
];

// SVG Minification
gulp.task('build:svg', gulp.series( done => {
  gulp.src(svgFiles)
    .pipe(cache('build:svg'))
    .pipe(debug({title: 'svgmin:'}))
    .pipe(svgmin())
    .pipe(gulp.dest('dist/'));

    done();
}));

// Convert SVG to PNG
gulp.task('build:png', gulp.series( done => {
  gulp.src(svgFiles)
    .pipe(cache('build:png'))
    .pipe(debug({title: 'raster:'}))
    .pipe(raster({format: 'png'}))
    .pipe(rename({extname: '.png'}))
    .pipe(gulp.dest('dist/'));

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
gulp.task('lint', gulp.parallel('lint:xml'));
gulp.task('watch', gulp.parallel('watch:svg'));