---
title: Setting up the router
short: Setup (Router)
template: slide.jade
---

To ease the work with routing we'll make use of [UI Router](https://github.com/angular-ui/ui-router). It's much better than Angular's default [$routeProvider](https://docs.angularjs.org/api/ngRoute/provider/$routeProvider) (IMHO).

To make it accessible for angular, we need to add UI Router to the list of dependencies. We do this by modifying ```src/app.js```:

    angular.module('workshop', []);

to

    import 'angular-ui/ui-router';
    angular.module('workshop', ['ui.router']);

UI Router operates with states, which are reachable by given URLs. States can be assigned into a hierarchy of states, e.g. state ```foo.bar``` is a child state ```foo```. By default UI Router adds an abstract state as the root state of all states, but apart from this we won't bother with hierarchies of states in this application.

Let's create our first state in ```src/router.config.js```:

    class RouterConfig {
      constructor($stateProvider, $urlRouterProvider) {
        $stateProvider.state('start', {
          url: '/start',
          templateUrl: 'slides/start.html'
        });

        $urlRouterProvider.otherwise('/start');
      }
    }

Here is a class named RouterConfig that has a constructor that takes in ```$stateProvider``` and ```$urlRouterProvider```. These _services_ are provided by UI Router, and will be provided by [Angulars Dependency Injection](https://docs.angularjs.org/guide/di) when we link the class to Angular. To expose it we need to append the following:

    export default RouterConfig;

We link it to Angular by adding the following to ```src/app.js```:

    import RouterConfig from './router.config';
    angular.module('workshop').config(RouterConfig);

The ```config```-part of Angular enables us to add separate configurations that are processed before services, factories, controllers, directives, and filters (we'll see more of all these, except filters, later on).

If we now visit our application at [localhost:8282](http://localhost:8282), we should see the first slide being loaded.

As you probably have noticed, the slides are loaded into the ```ui-view```-element. This is how we tell UI Router where it should load the templates we describe in our states. UI Router supports [Multiple Named Views](https://github.com/angular-ui/ui-router/wiki/Multiple-Named-Views), but in this application we'll stick with one unnamed.

## Automating the creation of states

Now, to add all slides one by one is a bit cumbersome, so we have a little trick up our sleeve. All the slides are exposed as an array in ```src/slides.env.js```. We are also going to need a short version of each slides' title later on, so we'll add this as well.

Modify ```src/router.config.js``` to:

    import slides from './slides.env';

    class RouterConfig {
      constructor($stateProvider, $urlRouterProvider) {
        slides.forEach(function (slide) {
          $stateProvider.state(slide.name, {
            url: '/'+slide.name,
            templateUrl: 'slides/'+slide.name+'.html',
            data: {
              title: slide.title,
              short: slide.short
            }
          });
        });

        $urlRouterProvider.otherwise('/start');
      }
    }

    export default RouterConfig;

The main change in this code is the use of ```Array.prototype.forEach```. This is an example of how JavaScript treats functions as first-class citizens (i.e. functions can be stored as variables, passed as parameters, etc): ```Array.prototype.forEach``` takes a function, which is uses to iterate over the array on which it is called (in this case the variable ```slides```, which is loaded from ```./slides.env```).

We can now access our slides by inserting ```http://localhost:8282/#/<name of slide>``` into our address bar. But that's not good usability, so let us add some navigation components.