---
title: Setting up the help queue directive
short: Help queue (directive)
template: slide.jade
---

Finally we tie it all together in ```src/directives/helpQueue.directive.js```:

    import React from 'react';
    import HelpQueue from './components/HelpQueue.jsx!';

    class HelpQueueDirective {
      constructor(socketService) {
        return function (scope, element) {
          socketService.onPleadsUpdate(function (users) {
            var handleUserInput = function (username, isAskingForHelp) {
              socketService.emitAskingForHelp(username, isAskingForHelp);
            };
            var helpQueueElement = React.createElement(HelpQueue, {
              users: users,
              handleUserInput: handleUserInput
            });
            React.render(helpQueueElement, element[0]);
          });
        };
      }
    }

    export default HelpQueueDirective;

Once again we make use of the socketService, and tells the application to render the list of users in need of help every time it gets an update from the server. We also create the _handleUserInput_ that we pass down to the HelpButton-component.

Remember to include the directive in ```src/app.js```:

    import HelpQueueDirective from './directives/helpQueue.directive';
    angular.module('workshop').directive('helpQueue', HelpQueueDirective);

