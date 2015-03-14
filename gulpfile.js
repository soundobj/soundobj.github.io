var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var browserslist = require('browserslist');
// var traceur = require('gulp-traceur'),
// var to5 = require('gulp-6to5'),
// var plumber = require('gulp-plumber'),
// var es6Path = 'js/es6/*.js',
// var compilePath = 'js';

// gulp.task('traceur', function () {
//     gulp.src([es6Path])
//         .pipe(plumber())
//         .pipe(traceur({ blockBinding: true }))
//         .pipe(gulp.dest(compilePath));
// });

// gulp.task('6to5', function () {
//     gulp.src([es6Path])
//         .pipe(plumber())
//         .pipe(to5())
//         .pipe(gulp.dest(compilePath));
// });

// gulp.task('watch', function() {

//     gulp.watch([es6Path], ['traceur']);

// });

// gulp.task('default', ['traceur', 'watch']);


gulp.task('default', function () {
    return gulp.src('_site/css/main.css')
        .pipe(autoprefixer({
            //browsers: ['last 2 versions'],
            browsers: browserslist('last 2 versions'),
            cascade: true
        }))
        .pipe(gulp.dest('dist'));
});