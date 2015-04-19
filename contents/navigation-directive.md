---
title: Creating the navigation directive
short: Navigation (directive)
template: slide.jade
---

Now that we've created our factory and our React component, lets tie it all together as an Angular directive. Lets put the following into ```src/directives/navigation.directive.js```:

    import React from 'react';
    import Navigation from './components/Navigation.jsx!';

    class NavigationDirective {
      constructor() {
        return function (scope, element) {
          scope.$on('$stateChangeSuccess', function (event, state) {
            var slide = state.slide;
            var navigationElement = React.createElement(Navigation, {
              previous: slide.previous,
              next: slide.next
            });
            React.render(navigationElement, element[0]);
          });
        }
      }
    }

    export default NavigationDirective;

Lets look at what the above code does:

1.  It imports the React library and the navigation component.
2.  Sets up the class ```NavigationDirective``` (which it exposes as a module).
3.  Returns an anonymous function (the easiest way to define an Angular directive, [read here if you want to learn more](https://docs.angularjs.org/guide/directive)), this function brings _scope_ and _element_ into use, which respectively refers to the scope the directive hinges on, and the element on which it is implemented.

    (In addition to scope and element, _attributes_ and _controller_ may also be supplied as parameters; but we won't make use of them in this case.)
4.  We add an event listener to the scope, namely ```$stateChangeSuccess```, which triggers every time a state is changed. The anonymous function that is triggered are given two parameter, _event_ and _state_, of which we'll make use of the latter.
5.  The slide-object is fetched from the given state-parameter.
6.  It creates a React element from our navigation component. It also applies two properties to the element, namely ```previous``` and ```next```.
7.  Finally it renders the element onto the directive element. Angular makes use of simplified implementation of [jQuery](http://jquery.com/), namely [jQuery Lite](https://docs.angularjs.org/api/ng/function/angular.element), or just jqLite for short, so to get the actual DOM-element we need to pass ```element[0]```.

At last we need to include our directive in ```src/app.js```:

    import NavigationDirective from './directives/navigation.directive';
    angular.module('workshop').directive('presentationNavigation', NavigationDirective);
    
With all of this in place, we can now navigate between our slides.