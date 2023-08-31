
const gulp = require('gulp');
// const gulp = await import('gulp')

const sass = require('gulp-sass');
// const sass = await import('gulp-sass')
const cssnano = require('gulp-cssnano');
// const cssnano = await import('gulp-cssnano')
const rev = require('gulp-rev');
// const rev = await import('gulp-rev')


gulp.task('css', function(done){
    console.log('minifying css...');
    gulp.src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'));

    return gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
}) 




