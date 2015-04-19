---
title: Handling slides with a service
short: Navigation (service)
template: slide.jade
---

Lets put SlidesService into ```src/services/slides.service.js```. We'll start by coding the constructor:

    class SlidesService {
      constructor($state, slidesFactory) {
        var states = $state.get().filter(function (state) {
          return !state.abstract;
        });
        var slides = this.slides = states.map(function (state) {
          var slide = slidesFactory.fromState(state);
          state.slide = slide;
          return slide;
        });
        this.slides.forEach(function (slide, index) {
          slide.step = index;
          slide.previous = slides[index - 1];
          slide.next = slides[index + 1];
        });
      }
    }

The code in the constructor can be grouped into three parts:

1.  The ```$state.get().filter(...);```: This code starts by getting all states via $state.get(), and then makes use of ```Array.prototype.filter```. Filter allows us to pass it a function that returns a boolean, and which it uses to loop through all elements in the array; if it returns true, the tested item is included in a new array, if it returns false it is discarded.

    The result is an array of states that excludes the abstract state that UI Router uses as a root of all states.
2.  We make use of another nifty function called ```Array.prototype.map```: This creates a new array based on an array, meaning they have the equal amount of elements, but (should) represent two different list of entities.
    
    The array we map is a list of slides corresponding to our list of states. In addition, we add each corresponding slide to the state, for easy access to slides through the state they represent.
3.  At last we loop through our slides and updates the ```step```, ```previous``` and ```next``` property.

We need a way for our components to get the slides, so we implement the method ```get```:

    get(stateName) {
      return stateName ? this.slides.reduce(function (memo, slide) {
        return memo ? memo : (slide.name === stateName ? slide : memo);
      }, null) : this.slides;
    }

The method may take a paramenter, which is the name of the requested state. If no parameter is given, it returns the whole list of slides. If a name is given, it makes use of ```Array.prototype.reduce``` which reduces the array into one single element, namely the element on which the name-property matches the given name.

At last we need to expose our module to the other parts of the system:

    export default SlidesService;

And this is tied into ```src/app.js``` with:

    import SlidesService from './services/slides.service';
    angular.module('workshop').service('slidesService', SlidesService);

## A note on functions that make use of callback functions

The fact that JavaScript handles functions as first-class citizens are really useful! Methods such as _forEach_, _map_, _reduce_ and _filter_ makes our codebase significantly less complex. They may be a bit hard to understand in the beginning, but they are worth getting to know.