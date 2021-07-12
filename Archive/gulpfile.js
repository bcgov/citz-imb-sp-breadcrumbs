const gulp=require('gulp')
const concat=require('gulp-concat')

gulp.task('build-script', function(){
    return gulp.src('./build/static/js/*.js')
    .pipe(concat('breadcrumb.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(gulp.dest('Z:/Style Library/Breadcrumb/js'))

})

gulp.task('build-css', function(){
    return gulp.src('./build/static/css/*.css')
    .pipe(concat('breadcrumb.css'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(gulp.dest('Z:/Style Library/Breadcrumb/css'))
})

gulp.task('default', gulp.parallel(['build-script', 'build-css']))