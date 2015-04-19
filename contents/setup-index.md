---
title: Setting up index.html
short: Setup (index.html)
template: slide.jade
---

Lets start by taking a look at the markup of our application. Open ```./index.html``` in your text-editor of choice.

    <!doctype html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Workshop with ES6, JSPM, Angular, React, +++</title>
      <link rel="stylesheet" href="css/style.css">
    </head>
    <body>
      <div role="main">
        <ui-view>Loading...</ui-view>
        <presentation-navigation></presentation-navigation>
      </div>
      <aside id="updates">
        <progress-list></progress-list>
        <help-queue></help-queue>
      </aside>
      <aside role="directory" presentation-index></aside>
      <script src="jspm_packages/system.js"></script>
      <script src="config.js"></script>
      <script>
        System.import('src/app');
      </script>
    </body>
    </html>

Starting from the top we see some standard content that sets up the meta-information and stylesheet for the page. This is necessary for the application, but of no interest for this workshop; what interests us lies in the body:

* Within the ```<div role="main">``` there is the [uiView-directive](http://angular-ui.github.io/ui-router/site/#/api/ui.router.state.directive:ui-view): We'll use this later on to load our slides.
* Right below it we see ```<presentation-navigation></presentation-navigation>```: This will be implemented as an Angular directive that will handle the navigation between slides (i.e. "Next" and "Previous"-links).
* Within the first aside-element, we find the modules that will handle updates from our advanced server later on:
    * The progress list, that lists all visitors to the presentation within a summarized overview of the visitors progress, and
    * The help module, where visitors can request help by clicking a button
* The second aside-element sports the attribute ```presentation-index```: Here we implement an Angular directive that displays a navigation-list that allows us to jump to anywhere we want in the presentation.
* The last part of the document implements the necessary scripts to get our JavaScript up and running: [SystemJS](https://github.com/systemjs/systemjs) is bundled with jspm, and works as a universal dynamic loader module. Together with config.js, which is automatically curated by jspm, and the import of ´´´src/app´´´, we can start coding our JavaScript.