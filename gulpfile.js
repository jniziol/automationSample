const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');

const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');


// This is the default gulp task that will run when you run gulp at the command prompt
// Notice the first parameter is 'default'? That makes it the default task. 
// The second argument is an array of strings that tells Gulp to subsequently run these
// other tasks PRIOR to executing what it's being told to do in the third parameter - the callback function.
gulp.task('default', ['css', 'js', 'images'], () => {

  // This command tells gulp to sit and watch the SASS folder and if there are any changes to the *.scss files
  // it executes the task defined in 'css' below. Go ahead, try it out.
  gulp.watch('./src/sass/**/*.scss', ['css'])
})

gulp.task('css', () => {
	return gulp.src('./src/sass/**/*.scss') 
		.pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
		.pipe(autoprefixer({
        browsers: ['last 2 versions']
    }))
		.pipe(gulp.dest('./dist/css/'))
});

gulp.task('images', () => {
  gulp.src('./src/img/**/*') 
    .pipe(imagemin({verbose: true}))
		.pipe(gulp.dest('./dist/img/'))
});

gulp.task('js', () => {
  return gulp.src('./src/js/**/*.js') 
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(concat('main.js'))
  .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./dist/js/'))
})
