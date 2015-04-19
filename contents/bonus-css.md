---
title: Bonus - Generating the CSS
short: Bonus (CSS)
template: slide.jade
---

The CSS is written using [Sass](http://sass-lang.com/), which is a preprocessor for CSS. In addition a lot of mixins from [Compass](http://compass-style.org/) have been used fix some standard problems.

The rules are in ```sass/style.sass``` and have been written with a [mobile first approach](http://zurb.com/word/mobile-first) in mind; that is, the design is written for small screens first, and then adjusted to larger screens.

The CSS-file is generated with [grunt-contrib-compass](https://github.com/gruntjs/grunt-contrib-compass), whose task is located in ```grunt/compass.js``` (which is referred to in ```grunt/aliases.js```).