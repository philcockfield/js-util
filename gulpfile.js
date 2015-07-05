'use strict'
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var babel = require('gulp-babel');


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
