const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')
const imagemin = require('gulp-imagemin')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')


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
	// this will retrieve ALL the files with the extension .scss in the CSS directory and any subdirectories
	gulp.src('./src/sass/**/*.scss') 
		
		// We 'pipe' the file to Gulp Sass, which will convert it from SCSS/SASS to normal CSS
		// If it encounters any errors, it will just log them out to the console instead of 
		// totally breaking half-way through. While we're at it, the gulp-sass function also takes
		// a parameter that will compress the CSS at the same time.
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		
		// Now we take the output from the newly generated CSS files we created and we 'pipe' them into the
		// the autoprefixer which will prepare update the prefixes for the 2 most recent releases of browsers
		// Luckily this isn't many.
		.pipe(autoprefixer({
        browsers: ['last 2 versions']
    }))

		// We finish off by outputting our transpiled, compressed, and prefixed CSS to the distribution directory
		.pipe(gulp.dest('./dist/css/'))
})

gulp.task('images', () => {
 	// this will retrieve ALL the files in the img directory and any subdirectories
  gulp.src('./src/img/**/*') 

    // We pipe the images to the image compressor and it does it thing, making images smaller where it can
    .pipe(imagemin())

    // We finish off by outputting our compressed images to the distribution directory
		.pipe(gulp.dest('./dist/img/'))
})

gulp.task('js', () => {
  // this will retrieve ALL the files in the img directory and any subdirectories
  gulp.src('./src/js/**/*.js') 

    // We pipe the javascript files to the babel first to get converted from ES6 to ES5 
    .pipe(babel({
      presets: ['env']
    }))

    // Next, we 'pipe' the files to concat which will concatenate all the files together and output to the file
    // we tell it to, in this case it's 'all.js'
    .pipe(concat('all.js'))

    // Finally, lets uglify it, by passing it to our uglify. Uglify suggests we use PUMP in case any errors arise, but
    // for this exercise, I omitted it.
    .pipe(uglify())


   // We finish off by outputting our compressed images to the distribution directory
   .pipe(gulp.dest('./dist/js/'))
})
