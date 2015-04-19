---
title: Creating slides with a factory
short: Navigation (factory)
template: slide.jade
---

We`ll create SlidesFactory in ```src/factories/slides.factory.js```. First, let us express the _Slide_ as a class:

    class Slide {
      constructor(name, title, short, url) {
        this.name = name;
        this.title = title;
        this.short = short;
        this.url = url;
      }
    }

This class basicly maps the state-object, and is very simple at this point. We want to expand it with more functionality later on, but for now, lets stick with this.

Next, lets look at a very simple implementation of the _SlidesFactory_:

    class SlidesFactory {
      constructor() {
        return {
          fromState: function (state) {
            return new Slide(
              state.name, 
              state.data.title, 
              state.data.short, 
              $state.href(state.name)
            );
          }
        }
      }
    }

Important to note in this is that the constructor returns a new object that contains one method for creating a slide from a given state. This kind of nullifies the use of class, but is a constraint when creating Angular factories.

To expose this we add the following to ```src/factories/slides.factory.js```:

    export default SlidesFactory;

Next we'll need to expose the factory the Angular environment. We do that by adding the following to ```src/app.js```:

    import SlidesFactory from './factories/slides.factory';
    angular.module('workshop').factory('slidesFactory', SlidesFactory);