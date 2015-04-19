---
title: Bonus - Adding keypress-events
short: Bonus (keypress)
template: slide.jade
---

To ease navigation between slides, I added some eventlisteners for the event _keydown_. I added these event-listeners with ```angular.run()```, as these are run at the start of every application instance (and I want the eventlisteners to be global). Check out the section on [Module loading and dependencies](https://docs.angularjs.org/guide/module#module-loading-dependencies) in the Angular guide to learn more.

The code for this is located in ```src/runs/handleKeypressEvents.js```:

    class HandleKeypressEvents {
      constructor($state, $window) {
        // keypress event
        $window.document.addEventListener('keydown', function (e) {
          if(e.keyCode === 39) {
            $state.current.slide.goNext($state);
          } else if (e.keyCode === 37) {
            $state.current.slide.goPrevious($state);
          }
        });
      }
    }

    export default HandleKeypressEvents;

This is used in ```src/app.js``` by including the following:

    import HandleKeypressEvents from './runs/handleKeypressEvents';
    angular.module('workshop').run(HandleKeypressEvents);

As you might've noticed there are also some new methods on the slide object, namely _goNext_ and _goPrevious_. These are added to ```src/factories/slides.factory.js```:

    class Slide {
      [...]

      goNext($state) {
        $state.go(this.next ? this.next.name : this.name);
      }

      goPrevious($state) {
        $state.go(this.previous ? this.previous.name : this.name);
      }
    }