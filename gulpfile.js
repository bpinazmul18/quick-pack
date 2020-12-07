const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const rename = require('gulp-rename')
// const cssmin = require('cssmin');
//FOR DEVELOPMENT
/* SASS-COMPILER */
function sassCompiler() {
    return gulp
        .src('src/sass/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('src/css/'))
        .pipe(browserSync.stream())
}
gulp.task(sassCompiler);
//CREATE-SERVER
function createServer() {
    browserSync.init({
        server: {
            baseDir: 'src'
        }
    });
    gulp.watch('src/sass/**/*.scss', sassCompiler);
    gulp.watch('src/*.html').on('change', browserSync.reload);
}
gulp.task(createServer);

//FOR PRODUCTION
/*TRANSFER HTML TO DIST*/
function htmlForProduction() {
    return gulp
        .src('src/*.html')
        .pipe(gulp.dest('dist/'))
}
gulp.task(htmlForProduction);
/*TRANSFER CSS TO DIST*/
function cssForProduction() {
    return gulp
        .src('src/css/*.css')
        // .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css/'));
}
gulp.task(cssForProduction);
gulp.task('start', gulp.series(sassCompiler, createServer));//FOR DEVELOPMENT
gulp.task('build', gulp.series(cssForProduction, htmlForProduction));//FOR PRODUCTION