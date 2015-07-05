'use strict'
var gulp = require('gulp');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');


gulp.task('build', ['build-util']);
gulp.task('build-util', function () {
  return gulp.src('./util/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist/util'));
});


// ----------------------------------------------------------------------------


gulp.task('lint', function() {
  return gulp.src('./util/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format());
});


// ----------------------------------------------------------------------------
gulp.task('default', ['build']);
