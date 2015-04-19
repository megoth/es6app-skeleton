---
title: Setting up the progress directive
short: Progress (directive)
template: slide.jade
---

To conclude the progress component we need to implement the Angular directive. Lets do this in ```src/directives/progress.directive.js```:

    import React from 'react';
    import Progress from './components/Progress.jsx!';

    class ProgressDirective {
      constructor(slidesService, socketService) {
        var slides = slidesService.get();
        return function (scope, element) {
          socketService.onProgressUpdate(function (list) {
            var progressElement = React.createElement(Progress, {
              steps: list,
              slides: slides
            });
            React.render(progressElement, element[0]);
          });
        }
      }
    }

    export default ProgressDirective;

The only big difference from our previous directives are the use of ```socketService```. our event listener ensures that whenever there's an update from the server, the element is rendered anew.

To make this available in our application, remember to tie it into ```src/app.js```:

    import ProgressDirective from './directives/progress.directive';
    angular.module('workshop').directive('progressList', ProgressDirective);
