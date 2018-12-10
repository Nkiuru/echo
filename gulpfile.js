const gulp = require('gulp');
const babel = require('gulp-babel');
const nodemon = require('gulp-nodemon');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');

sass.compiler = require('node-sass');

// Set destination paths
const path = {
  js: 'src/client/js/*.js',
  scss: 'src/client/sass/**/*.scss',
  img: 'src/client/img/*.*',
};

gulp.task('js', () => {
  return gulp
    .src(path.js)
    .pipe(sourcemaps.init()) // create sourcemap
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(uglify()) // minify JS
    .pipe(sourcemaps.write('.')) // create external sourcemap
    .pipe(gulp.dest('dist/js')); // bundle destination
});

gulp.task('scss', () => {
  return gulp
    .src(path.scss)
    .pipe(
      sass({ includePaths: ['./src/client/sass'] }).on('error', sass.logError) // look for sass imports
    )
    .pipe(gulp.dest('dist/css'));
});

gulp.task('img', () => {
  return gulp
    .src(path.img)
    .pipe(gulp.dest('dist/img'));
});

gulp.task('default', ['js', 'scss']);

gulp.task('watch', ['js', 'scss', 'img'], () => {
  gulp.watch(path.js, ['js']);
  gulp.watch(path.scss, ['scss']);
  gulp.watch(path.img, ['img']);
});

// Watch for backend changes
gulp.task('start', ['watch'], () => {
  return nodemon({
    script: 'app.js',
    ignore: ['dist/*', 'src/client/*', 'sessions/*'],
  });
});
