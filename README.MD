# Simple HTML Project

Simple workflow using grunt to build HTML pages with HTML and Sass. The workflow also features a lot of optimizations like building SVG-sprites, properly injecting dependencies into Sass and Jade files, files and directory structure that would speed up development and a lot more.

More information and details about the configurations will be posted shortly.

## Requirements

* NodeJS
* NPM
* Grunt
* Sass
* Bower

## Installing the requirements

- NodeJS and NPM, check nodejs website.
- Grunt -> after installing nodejs, install `grunt-cli` using `npm install -g grunt-cli`.
- Bower -> after installing nodejs, install `bower` using `npm install -g bower`.

## Steps

- Install the node packages using `npm install`.
- Install the front-end packages using `bower install`.

## Serving the HTML and creating a build

- Run `grunt serve` to see the live HTML.
- Run `grunt` to create a build. A build is created in the directory called `dist`.
