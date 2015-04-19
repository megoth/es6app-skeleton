---
title: Bonus - Adding touch-events
short: Bonus (touch)
template: slide.jade
---

To handle touch events I've basicly done the same as with keyevents, but made use of [Hammer.JS](http://hammerjs.github.io/) to handle the events (_panleft_ and _panright_ to be more exact).

This code is located in ```src/runs/handleTouchEvents.js```:

    import Hammer from 'hammerjs/hammer.js';

    class HandleTouchEvents {
      constructor($rootScope, $state, $window) {
        // touch events
        delete Hammer.defaults.cssProps.userSelect;
        var mainElement = $window.document.getElementsByTagName('body')[0];
        var hammertime = new Hammer(mainElement);
        hammertime.on('panleft', function () {
          $state.current.slide.goNext($state);
        });
        hammertime.on('panright', function () {
          $state.current.slide.goPrevious($state);
        });
      }
    }

    export default HandleTouchEvents;

The use of ```delete Hammer.defaults.cssProps.userSelect;``` allows us to select text even with swipe-events. (Kind of important in a presentation like this.)

As previously, add the following in ```src/app.js``` to make it work:

    import HandleTouchEvents from './runs/handleTouchEvents'
    angular.module('workshop').run(HandleTouchEvents);
