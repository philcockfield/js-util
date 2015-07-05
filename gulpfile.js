var gulp = require('gulp');
var babel = require('gulp-babel');


gulp.task('build', ['build-util']);
gulp.task('build-util', function () {
  return gulp.src('./util/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist/util'));
});


// ----------------------------------------------------------------------------
gulp.task('default', ['build']);
