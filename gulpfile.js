var gulp = require('gulp'),
    traceur = require('gulp-traceur'),
    to5 = require('gulp-6to5'),
    plumber = require('gulp-plumber'),
    es6Path = 'js/es6/*.js',
    compilePath = 'js';

gulp.task('traceur', function () {
    gulp.src([es6Path])
        .pipe(plumber())
        .pipe(traceur({ blockBinding: true }))
        .pipe(gulp.dest(compilePath));
});

// gulp.task('6to5', function () {
//     gulp.src([es6Path])
//         .pipe(plumber())
//         .pipe(to5())
//         .pipe(gulp.dest(compilePath));
// });

gulp.task('watch', function() {

    gulp.watch([es6Path], ['traceur']);

});

gulp.task('default', ['traceur', 'watch']);