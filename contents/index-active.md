---
title: Extending the slides with active functionality
short: Index (active)
template: slide.jade
---

To express the state active in a given slide, we extend the class Slide with property ```active``` that is false by default (in ```src/factories/slides.factory.js```):

    class Slide {
      constructor(name, title, short, url) {
        [...]
        this.active = false;
      }
    }

In ```src/services/slides.service.js``` we need a method that handles that the active property is correct across all our slides:

    class SlidesService {
      constructor($state, slidesFactory, $rootScope) {
        [...]
        $rootScope.$on('$stateChangeSuccess', function (event, state) {
          slides.forEach(function (slide) {
            slide.active = slide.name === state.name;
          });
        });
      }

      [...]
    }

This should be enough so that we can start creating our React components.