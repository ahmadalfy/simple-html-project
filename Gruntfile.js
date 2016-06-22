// Generated on 2015-05-12 using
// generator-webapp 0.5.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Automatically load required grunt tasks
  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin'
  });

  // Configurable paths
  var config = {
    app: 'app',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      babel: {
        files: ['<%= config.app %>/scripts/{,*/}*.js'],
        tasks: ['babel:dist']
      },
      babelTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['babel:test', 'test:watch']
      },
      pug: {
        files: ['<%= config.app %>/{,*/}*.pug'],
        tasks: ['pug']
      },
      gruntfile: {
        files: ['Gruntfile.js'],
        tasks: ['copy:server']
      },
      sass: {
        files: ['<%= config.app %>/styles/**/*.{scss,sass}'],
        tasks: ['sass:server', 'autoprefixer']
      },
      styles: {
        files: ['<%= config.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      svg: {
        files: ['<%= config.app %>/images/svg-sprite/*.svg'],
        tasks: ['svgstore:server']
      }
    },

    browserSync: {
      options: {
        notify: false,
        background: true,
        watchOptions: {
          ignored: ''
        }
      },
      livereload: {
        options: {
          files: [
            '<%= config.app %>/{,*/}*.html',
            '.tmp/styles/{,*/}*.css',
            '<%= config.app %>/images/{,*/}*',
            '.tmp/scripts/{,*/}*.js'
          ],
          port: 9000,
          server: {
            baseDir: ['.tmp', config.app],
            routes: {
              '/bower_components': './bower_components'
            },
            middleware: [
              function (req, res, next) {
                var endsWithExtension = /^.*[.]\w+$/;
                if (!endsWithExtension.test(req.url)) { // it doesnt have an extension
                  req.url = req.url.replace(/\/$/, '') + '.html';
                }

                next();
              }
            ]
          }
        }
      },
      test: {
        options: {
          port: 9001,
          open: false,
          logLevel: 'silent',
          host: 'localhost',
          server: {
            baseDir: ['.tmp', './test', config.app],
            routes: {
              '/bower_components': './bower_components'
            }
          }
        }
      },
      dist: {
        options: {
          background: false,
          server: '<%= config.dist %>'
        }
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= config.app %>/scripts/{,*/}*.js',
        '!<%= config.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },

    // Mocha testing framework configuration options
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://<%= browserSync.test.options.host %>:<%= browserSync.test.options.port %>/index.html']
        }
      }
    },

    // Compiles ES6 with Babel
    babel: {
      options: {
        sourceMap: false
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/scripts',
          src: '**/*.js',
          dest: '.tmp/scripts',
          ext: '.js'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: 'test/spec',
          src: '{,*/}*.js',
          dest: '.tmp/spec',
          ext: '.js'
        }]
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    sass: {
      options: {
        sourceMap: true,
        includePaths: ['bower_components']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/styles',
          src: ['*.{scss,sass}'],
          dest: '.tmp/styles',
          ext: '.css'
        }]
      },
      server: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/styles',
          src: ['*.{scss,sass}'],
          dest: '.tmp/styles',
          ext: '.css'
        }]
      }
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the HTML file
    wiredep: {
      app: {
        ignorePath: /^\/|\.\.\//,
        src: [
          '<%= config.app %>/includes/_head.pug',
          '<%= config.app %>/includes/_scripts.pug',
        ],
        exclude: [
          'bower_components/modernizr/modernizr.js'
        ],
        overrides: {}
      },
      sass: {
        src: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      },
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= config.dist %>/scripts/{,*/}*.js',
            '<%= config.dist %>/styles/{,*/}*.css',
            '<%= config.dist %>/images/{,*/}*.*',
            '<%= config.dist %>/styles/fonts/{,*/}*.*',
            '<%= config.dist %>/*.{ico,png}'
          ]
        }
      }
    },

    favicons: {
      options: {
        trueColor: true,
        precomposed: true,
        appleTouchBackgroundColor: '',
        coast: true,
        windowsTile: true,
        tileBlackWhite: false,
        tileColor: 'auto',
        html: '<%= config.dist %>/*.html',
        HTMLPrefix: '/images/icons/'
      },
      icons: {
        src: '<%= config.app %>/images/favicon-src/logo.png',
        dest: '<%= config.dist %>/images/favicons'
      }
    },

    pug: {
      dist: {
        options: {
          pretty: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.app %>',
          dest: '.tmp',
          src: '*.pug',
          ext: '.html'
        }, {
          expand: true,
          cwd: '<%= config.app %>',
          src: [
            'includes/_footer.pug',
            'includes/_head.pug',
            'includes/_sidebar.pug'
          ],
          dest: '<%= config.dist %>',
          ext: '.html'
        }]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      options: {
        dest: '<%= config.dist %>',
        flow: {
          steps: {
            js: ['concat', 'uglifyjs'],
            css: ['concat', 'cssmin']
          },
          post: {}
        },
      },
      html: '.tmp/index.html'
    },


    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: [
          '<%= config.dist %>',
          '<%= config.dist %>/images',
          '<%= config.dist %>/styles'
        ]
      },
      html: ['.tmp/{,*/}*.html'],
      css: ['<%= config.dist %>/styles/{,*/}*.css']
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%= config.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= config.dist %>/images'
        }]
      }
    },

    svgstore: {
      options: {
        prefix : 'shape-', // This will prefix each <g> ID
      },
      default: {
        files: {
          '<%= config.dist %>/images/svg-defs.svg': ['<%= config.app %>/images/svg-sprite/*.svg']
        }
      },
      server: {
        files: {
          '.tmp/images/svg-defs.svg': ['<%= config.app %>/images/svg-sprite/*.svg']
        }
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: false,
          conservativeCollapse: false,
          removeAttributeQuotes: false,
          removeCommentsFromCDATA: false,
          removeEmptyAttributes: false,
          removeOptionalTags: false,
          removeRedundantAttributes: false,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '.tmp',
          src: '{,*/}*.html',
          dest: '<%= config.dist %>'
        }]
      }
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care
    // of minification. These next options are pre-configured if you do not
    // wish to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= config.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css',
    //         '<%= config.app %>/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: [{
    //       expand: true,
    //       cwd: '<%= config.app %>',
    //       dest: '<%= config.dist %>',
    //       src: [
    //         'scripts/*.js'
    //       ]
    //     }]
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dist %>',
          src: [
            '*.{ico,png,txt}',
            'images/{,*/}*.webp',
            '{,*/}*.html',
            'fonts/{,*/}*.*'
          ]
        }, {
          expand: true,
          dot: true,
          cwd: '.tmp',
          dest: '<%= config.dist %>',
          src: [
            'scripts/**'
          ]
        }, {
          src: 'node_modules/apache-server-configs/dist/.htaccess',
          dest: '<%= config.dist %>/.htaccess'
        }, {
          expand: true,
          dot: true,
          cwd: 'bower_components/fontawesome',
          src: ['fonts/*.*'],
          dest: '<%= config.dist %>'
        }, {
          expand: true,
          dot: true,
          cwd: 'bower_components/uniform/themes/default',
          src: ['images/*.*'],
          dest: '<%= config.dist %>'
        }, {
          expand: true,
          dot: true,
          cwd: 'bower_components/bootstrap/dist',
          src: ['fonts/*.*'],
          dest: '<%= config.dist %>'
        }, {
          expand: true,
          dot: true,
          cwd: 'bower_components/font-awesome',
          src: ['fonts/*.*'],
          dest: '<%= config.dist %>'
        }, {
          expand: true,
          dot: true,
          cwd: 'bower_components/simple-line-icons',
          src: ['fonts/*.*'],
          dest: '<%= config.dist %>'
        }, {
          expand: true,
          dot: true,
          cwd: 'bower_components/slick-carousel/slick',
          src: ['fonts/*.*'],
          dest: '<%= config.dist %>'
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= config.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      },
      server: {
        files: [
          {
            src: 'bower_components/jquery/dist/jquery.min.js',
            dest: '.tmp/scripts/lib/jquery/jquery.js'
          }, {
            expand: true,
            dot: true,
            cwd: 'bower_components/bootstrap/js',
            src: ['*.js'],
            dest: '.tmp/scripts/lib/bootstrap'
          }, {
            src: 'bower_components/moment/moment.js',
            dest: '.tmp/scripts/lib/moment/moment.js'
          }, {
            src: 'bower_components/bootstrap-daterangepicker/daterangepicker.js',
            dest: '.tmp/scripts/lib/bootstrap-addons/daterangepicker.js'
          }, {
            src: 'bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.js',
            dest: '.tmp/scripts/lib/bootstrap-addons/datepicker.js'
          }, {
            src: 'bower_components/bootstrap-hover-dropdown/bootstrap-hover-dropdown.js',
            dest: '.tmp/scripts/lib/bootstrap-addons/bootstrap-hover-dropdown.js'
          }, {
            src: 'bower_components/bootstrap-select/dist/js/bootstrap-select.js',
            dest: '.tmp/scripts/lib/bootstrap-addons/bootstrap-select.js'
          }, {
            src: 'bower_components/uniform/lib/jquery.uniform.js',
            dest: '.tmp/scripts/lib/jquery/plugins/uniform.js'
          }, {
            src: 'bower_components/jquery-minicolors/jquery.minicolors.js',
            dest: '.tmp/scripts/lib/jquery/plugins/minicolors.js'
          }, {
            src: 'bower_components/jquery-minicolors/jquery.minicolors.png',
            dest: '.tmp/images/jquery.minicolors.png'
          }, {
            expand: true,
            dot: true,
            cwd: 'bower_components/flot',
            src: ['*.js'],
            dest: '.tmp/scripts/lib/flot'
          }
        ]
      }
    },

    // Generates a custom Modernizr build that includes only the tests you
    // reference in your app
    modernizr: {
      dist: {
        dest: '<%= config.dist %>/scripts/lib/modernizr/modernizr.js',
        files: {
          src: [
            '<%= config.dist %>/scripts/{,*/}*.js',
            '<%= config.dist %>/styles/{,*/}*.css',
            '!<%= config.dist %>/scripts/vendor/*'
          ]
        },
        // Define any tests you want to explicitly include
        tests : [],
        // Useful for excluding any tests that this tool will match
        // e.g. you use .notification class for notification elements,
        // but don’t want the test for Notification API
        excludeTests: [],
        // Based on default settings on http://modernizr.com/download/
        options : [
          'setClasses',
          'addTest',
          'html5printshiv',
          'testProp',
          'fnBind'
        ],
        uglify: true
      }
    },

    requirejs: {
      compile: {
        options: {
          baseUrl: './',
          mainConfigFile: 'scripts/config.js',
          // name: 'path/to/almond', /* assumes a production build using almond, if you don't use almond, you need to set the "includes" or "modules" option instead of name */
          include: [ 'src/main.js' ],
          out: 'dist/scripts/optimized.js'
        }
      }
    },

    // Run some tasks in parallel to speed up build process
    concurrent: {
      server: [
        'babel:dist',
        'sass:server',
        'copy:styles',
        'copy:server'
      ],
      test: [
        'babel',
        'copy:styles'
      ],
      dist: [
        'babel',
        'sass',
        'copy:styles',
        'copy:server',
        'imagemin',
        'svgmin'
      ]
    },

    'sftp-deploy': {
      build: {
        auth: {
          host: 'url',
          port: 'port',
          authKey: 'key'
        },
        cache: 'sftpCache.json',
        src: '<%= config.dist %>',
        dest: 'dist on server',
        serverSep: '/',
        concurrency: 4,
        progress: true
      }
    }
  });


  grunt.registerTask('serve', 'start the server and preview your app', function (target) {

    if (target === 'dist') {
      return grunt.task.run(['build', 'browserSync:dist']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'pug',
      'svgstore:server',
      'concurrent:server',
      'autoprefixer',
      'browserSync:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });

  grunt.registerTask('test', function (target) {
    if (target !== 'watch') {
      grunt.task.run([
        'clean:server',
        'concurrent:test',
        'autoprefixer'
      ]);
    }

    grunt.task.run([
      'browserSync:test',
      'mocha'
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'wiredep',
    'pug',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'cssmin',
    'uglify',
    'svgstore:default',
    'copy:dist',
    'modernizr',
    //'rev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    //'test',
    'build'
  ]);

};
