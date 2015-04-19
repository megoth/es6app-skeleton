---
title: Creating the index directive
short: Index (directive)
template: slide.jade
---

With everything set up, we can implement our index directive in ```src/directives/index.directive.js```:

    import React from 'react';
    import Index from './components/Index.jsx!';

    class IndexDirective {
      constructor(slidesService) {
        return function (scope, element) {
          scope.$on('$stateChangeSuccess', function () {
            var indexElement = React.createElement(Index, { 
              slides: slidesService.get()
            });
            React.render(indexElement, element[0]);
          });
        }
      }
    }

    export default IndexDirective;

As previously noted, this code doesn't do much more then the navigation directive, it simply ties together other pieces.

To enable the directive in our application, we need to tie it into ```src/app.js```:

    import IndexDirective from './directives/index.directive';
    angular.module('workshop').directive('presentationIndex', IndexDirective);
