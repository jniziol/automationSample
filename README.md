1. Clone the project `git clone https://github.com/jniziol/automationSample.git`
2. Change direcotory into `automationSample`
3. Checkout the `solution` branch
4. Ensure that `gulp-cli` has been installed system wide with `npm install -g gulp-cli`
5. Install the following packages into the root of your project directory, `automationSample/` in this case. Did you know we can install them all at once? Like this: 
 `npm install --save-dev gulp gulp-sass gulp-autoprefixer gulp-imagemin gulp-babel babel-core babel-preset-env gulp-concat gulp-uglify`
  But guess what, since this solution comes with a `package.json` (created by running `npm init`) file, it actually tells our system what packages we need, automatically. Just run `npm install` and it will read the `dev-dependencies` from the `package.json` file.
6. Run your gulp tasks as defined in your gulp file, this will automatically create any output directories, such as `dist`

