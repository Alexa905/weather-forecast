var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jshintReporter = require('jshint-stylish');
var watch = require('gulp-watch');
var shell = require('gulp-shell');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');

var paths = {
    'src': ['./components/**/*.js'],
    'style': {
        'main': './styles.css',
        'all': './components/**/**component.css'
    }

};

gulp.task('default', ['lint', 'concat', 'watch']);
gulp.task('concat', ['concatScripts', 'concatStyles']);
gulp.task('watch', ['watch:css', 'watch:js']);

gulp.task('concatScripts', [], function () {
    gulp.src("components/**/**component.js")
        .pipe(concat('bundle.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('./'));
});

gulp.task('concatStyles', [], function () {
    gulp.src(["components/**/**component.css"])
        .pipe(concat('styles.css'))
        //.pipe(cssmin())
        .pipe(gulp.dest('./'));
});

gulp.task('lint', function () {
    gulp.src(paths.src)
        .pipe(jshint())
        .pipe(jshint.reporter(jshintReporter));
});

gulp.task('watch:css', function () {
    gulp.watch(paths.style.all, ['concatStyles']);
});

gulp.task('watch:js', function () {
    gulp.watch(paths.src, ['lint', 'concatScripts']);
});





