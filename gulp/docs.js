const gulp = require('gulp');
const fs = require('fs');

// HTML
const fileInclude = require('gulp-file-include');
const htmlclean = require('gulp-htmlclean');
const webpHTML = require('gulp-webp-html');

// SASS
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const webpCSS = require('gulp-webp-css');
const sourceMaps = require('gulp-sourcemaps');
const groupMedia = require('gulp-group-css-media-queries');

// JS
const babel = require('gulp-babel');
const webpack = require('webpack-stream');

// Server
const server = require('gulp-server-livereload');

// Images
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

// Other
const changed = require('gulp-changed');
const clean = require('gulp-clean');
const plumber = require('gulp-plumber');

// ----------------------
// Настройка error handler
const plumberHandler = (title) => ({
  errorHandler: function(err) {
    console.error(`${title} error:`, err.message);
    this.emit('end');
  }
});

// ----------------------
// Очистка папки docs
gulp.task('clean:docs', function(done) {
  if (fs.existsSync('./docs/')) {
    return gulp.src('./docs/', { read: false })
      .pipe(clean({ force: true }));
  }
  done();
});

// ----------------------
// HTML
const fileIncludeSettings = {
  prefix: '@@',
  basepath: '@file',
};

gulp.task('html:docs', function() {
  return gulp.src(['./src/html/**/*.html', '!./src/html/blocks/*html'])
    .pipe(plumber(plumberHandler('HTML')))
    .pipe(fileInclude(fileIncludeSettings))
    .pipe(htmlclean())
    .pipe(gulp.dest('./docs/'));
});

// ----------------------
// SASS
gulp.task('sass:docs', function() {
  return gulp.src('./src/scss/*.scss')
    .pipe(plumber(plumberHandler('SASS')))
    .pipe(sourceMaps.init())
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(groupMedia())
    .pipe(csso())
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('./docs/css/'));
});

// ----------------------
// Images
gulp.task('images:docs', function() {
  return gulp.src('./src/img/**/*')
    .pipe(gulp.dest('./docs/img/'));
});

// ----------------------
// Fonts
gulp.task('fonts:docs', function() {
  return gulp.src('./src/fonts/**/*')
    .pipe(gulp.dest('./docs/fonts/'));
});

// Files
gulp.task('files:docs', function() {
  return gulp.src('./src/files/**/*')
    .pipe(gulp.dest('./docs/files/'));
});

// JS
gulp.task('js:docs', function() {
  return gulp.src('./src/js/*.js')
    .pipe(plumber(plumberHandler('JS')))
    .pipe(babel())
    .pipe(webpack(require('./../webpack.config.js')))
    .pipe(gulp.dest('./docs/js/'));
});

// ----------------------
// Server
gulp.task('server:docs', function() {
  return gulp.src('./docs/')
    .pipe(server({ livereload: true, open: true }));
});

// ----------------------
// Основна збірка
gulp.task('build:docs', gulp.series(
  'clean:docs',
  gulp.parallel('html:docs', 'sass:docs', 'images:docs', 'fonts:docs', 'files:docs', 'js:docs')
));
