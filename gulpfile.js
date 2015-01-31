var fs         = require( 'fs' ),
    gulp       = require( 'gulp' ),
    to5        = require( 'gulp-6to5' ),
    prefixer   = require( 'gulp-autoprefixer' ),
    concat     = require( 'gulp-concat' ),
    data       = require( 'gulp-data' ),
    jade       = require( 'gulp-jade' ),
    juice      = require( 'gulp-juice' ),
    livereload = require( 'gulp-livereload' ),
    markdown   = require( 'gulp-markdown' ),
    minifyCSS  = require( 'gulp-minify-css' ),
    rename     = require( 'gulp-rename' ),
    sourcemaps = require( 'gulp-sourcemaps' ),
    stylus     = require( 'gulp-stylus' ),
    uglify     = require( 'gulp-uglify' ),
    dateExtend = require( 'date-extended' ),
    bower      = require( 'main-bower-files' ),

    date   = new Date,// need manual edit
    mdName = dateExtend.format( date, 'yyyy-MM-dd' ),

    paths = {
        src: {
            lib: 'assets/lib/',
            jslib: 'assets/lib/*.js',
            scripts: 'assets/js/*.js',
            styles : [ 'assets/lib/*.styl', 'assets/styles/*.styl' ],
            markdown: 'contents/source/' + mdName + '.md'
        },

        indeterminate: {
            markdown: 'contents/indeterminate/'
        },

        build: {
            lib: 'build/lib/',
            scripts: 'build/js/',
            styles : 'build/css/',
            email: 'contents/email/'
        }
    }

gulp.task( 'scripts', function() {
    var dest     = paths.build.scripts,
        fileName = 'index.js'

    gulp.src( paths.src.scripts )
        .pipe( to5() )
        .pipe( concat( fileName ) )
        .pipe( gulp.dest( dest ) )
        .pipe( livereload() )

    gulp.src( paths.src.jslib )
        .pipe( concat( fileName ) )
        .pipe( gulp.dest( paths.build.lib ) )
})

gulp.task( 'stylus', function() {
    gulp.src( paths.src.styles )
        .pipe( stylus() )
        .pipe( gulp.dest( paths.build.styles ) )
        .pipe( livereload() )
})

gulp.task( 'watch', function() {
    livereload.listen()
    gulp.watch( paths.src.scripts, [ 'scripts' ] )
    gulp.watch( paths.src.styles, [ 'stylus' ] )
    gulp.watch( 'index.html', [ 'default' ] )
})

gulp.task( 'convert', function() {
    return gulp.src( paths.src.markdown )
        .pipe( markdown() )
        .pipe( gulp.dest( paths.indeterminate.markdown ) )
})

gulp.task( 'email', [ 'convert' ], function() {
    var mdFile = mdName + '.html'

    return gulp.src( 'assets/tmpl/email.jade' )
        .pipe( data(function() {
            return {
                pageTitle: 'Web Weekly',
                content: String( fs.readFileSync( paths.indeterminate.markdown + mdFile ))
            }
        }))
        .pipe( rename( mdFile ) )
        .pipe( jade({
            pretty: true
        }) )
        .pipe( juice() )
        .pipe( gulp.dest( paths.build.email ) )
})

gulp.task( 'bower', function() {
    gulp.src( bower() )
        .pipe( gulp.dest( paths.src.lib ) )
})

gulp.task( 'min', function() {
    var libDestPath     = paths.build.lib,
        scriptsDestPath = paths.build.scripts,
        stylsDestPath   = paths.build.styles

    gulp.src( libDestPath + '*.js' )
        .pipe( rename( 'index.min.js' ) )
        .pipe( sourcemaps.init() )
        .pipe( uglify() )
        .pipe( sourcemaps.write( '.' ) )
        .pipe( gulp.dest( libDestPath ) )

    gulp.src( scriptsDestPath + '*.js' )
        .pipe( rename( 'index.min.js' ) )
        .pipe( sourcemaps.init() )
        .pipe( uglify() )
        .pipe( sourcemaps.write( '.' ) )
        .pipe( gulp.dest( scriptsDestPath ) )

    gulp.src( stylsDestPath + 'index.css' )
        .pipe( rename( 'index.min.css' ) )
        .pipe( prefixer( {
            browsers: [ 'last 2 versions' ],
            cascade: false
        } ))
        .pipe( sourcemaps.init() )
        .pipe( minifyCSS() )
        .pipe( sourcemaps.write( '.' ) )
        .pipe( gulp.dest( stylsDestPath ) )
})

gulp.task( 'default', [ 'watch', 'scripts', 'stylus' ] )

gulp.task( 'make', [ 'convert', 'email' ] )
