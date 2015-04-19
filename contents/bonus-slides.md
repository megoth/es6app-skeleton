---
title: Bonus - Generating slides
short: Bonus (slides)
template: slide.jade
---

The slides are located in the folder ```contents```. I've made use of [Wintersmith](http://wintersmith.io/) to convert these markdown-files into HTML-files located in ```slides```.

All markdown-files make use of ```templates/slide.jade```, which simply outputs the title and the content of the given file.

There is one special MD-file though, and that is ```content/slides.env.md``` which makes use of ```templates/slides.env.jade```. This file lists the order that the slides should be presented in and converts it to ```src/slides.env.js```. A hack that makes sure I only have one place to maintain the order of slides used in the presentation.

To automate the use of Wintersmith I've made use of [grunt-wintersmith](https://github.com/davidtucker/grunt-wintersmith).