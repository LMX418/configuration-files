var gulp = require('gulp')
//文件操作模块
var fs = require('fs')
// 本地服务器模块
var connect = require('gulp-connect');
// 本地服务器编译响应
var respond = require('gulp-respond');

var uglify = require('gulp-uglify');  //压缩js
var concat = require('gulp-concat'); //合并js

var sass = require('gulp-sass')

var ngAnnotate = require('gulp-ng-annotate');

var ngmin = require('gulp-ngmin'); 

var rev = require('gulp-rev');

var revCollector = require('gulp-rev-collector');

var clean = require('gulp-clean')

var minifyHTML   = require('gulp-minify-html');

var rename = require('gulp-rename');


gulp.task('sass' ,function(){
  gulp.src('src/css/*.scss')
      .pipe(sass())
      .pipe(gulp.dest('src/css/build/'))
})

gulp.task('clean',function(){
  return gulp.src(['./src/js/app/build/'])
             .pipe(clean())
})

gulp.task('build',['clean'],function(){
  return gulp.src([
    'src/js/app/app.js',
    'src/js/app/config.js',
    'src/js/app/controller.js',
    'src/js/app/directive.js',
    'src/js/app/filter.js',
    'src/js/app/api.service.js'
  ])
      .pipe(ngAnnotate())
      .pipe(ngmin())
      .pipe(uglify())
      .pipe(concat('ng.js'))
      .pipe(rename(function(path){
        path.basename += '.min'
        path.extname = '.js'
        console.log(path)
      }))
      .pipe(rev())
      .pipe(gulp.dest('./src/js/app/build/'))
      .pipe(rev.manifest())
      .pipe(gulp.dest('./src/'))

})

gulp.task('index',['build'],function(){
  return gulp.src('./src/index.html')
             .pipe(rename(function(path){
                path.basename = 'home'
                path.extname = '.html'
             }))
             .pipe(minifyHTML())
             .pipe(gulp.dest('./src/build/'))
})

gulp.task('rev',['index'],function(){
  return gulp.src(['./src/rev-manifest.json','./src/build/home.html'])
             .pipe(revCollector())
             .pipe(gulp.dest('./src/build/'))
})

// function getParams(url) {
//   var paramsObj = {};
//   var paramsArr = url.split('?')[1] ? url.split('?')[1].split('&') : [];
//   paramsArr.forEach(function(item) {
//     paramsObj[item.split('=')[0]] = item.split('=')[1];
//   });
//   return paramsObj;
// }

gulp.task('connect', function() {
  var params = {};
  // 启动本地server
  connect.server({
    // 多个root目录
    root: ['src', './bower_components'],
    port: 8008,
    livereload: true,
    // 本地server中间件，完成本地动态编译
    middleware: function () {
      return [function (req, res, next) {
        console.log('开始操作')
        next();
      },function(req,res){
        var path = req.url.split('?').shift();
        path = path == '/' ? '/build/home.html' : path;
        // 获取运行时参数
        // if (path.indexOf('index.html') > -1) {
        //   params = getParams(req.url);
        // }
        url = 'src' + path;
        console.log(url)
        if (!fs.existsSync(url)) {
          url = 'bower_components' + path;
          console.log(url)
        }


        return gulp.src(url)
        .pipe(respond(res));
      }];
    }
  });
});

gulp.task('test',function(){
  console.log('zheshi test task')
})

gulp.task('reloadHtml',['rev'],function(){
  return gulp.src('./src/build/home.html')
      .pipe(connect.reload())
})

var pathFile = [
  'src/js/app/*.js',
  'src/css/*.scss',
  'src/*.html'
]
gulp.task('watch',function(){
  gulp.watch(pathFile,['reloadHtml'])
})

gulp.task('serve', ['sass','rev','connect','watch']);





