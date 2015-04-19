---
title: Setting up Angular
short: Setup (Angular)
template: slide.jade
---

First off, we need to bootstrap Angular. If we want to create an app of somewhat size, it's recommended that we include our code in a given namespace. Lets call ours ```workshop```.

Open ```src/app.js``` and include the following:

    import angular from 'angular';
    angular.module('workshop', []);

Also, change ```<body>``` in ```index.html``` to ```<body ng-app="workshop">```. This is all we need to change in index.html to make Angular start doing its work.

## Scopes in Angular

One important fact to note at this point is concept of [scopes in Angular](https://docs.angularjs.org/guide/scope). Scopes refer to the application model, and mimics the hierarchical structure of the DOM structure.

There are two main purposes of scopes:

1. **To convey "the single truth" about your models:** as the scope is shared by all components connected to the view (and also services and factories through ```$rootScope```, which is at the top of the scope-hierarchy) it can be used to share states of whatever you need to model.
2. **To communicate between components:** Again, as scopes are shared between all components connected to the view, they can also communicate through the hierarchy. This is done by utilizing ```(scope).$on()```, ```(scope).$broadcast()```, and ```(scope).$emit()```.