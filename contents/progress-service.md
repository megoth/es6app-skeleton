---
title: Setting up services for the progress directive
short: Progress (services)
template: slide.jade
---

When working with Angular applications, it is adviced to code communication with external resources such as APIs and socket connections into services. We'll start coding the progress component by doing just that, as we centralize our communication using sockets into ```src/services/socket.service.js```.

Lets start by implementing the protocols required by the progress component:

    class SocketService {
      constructor() {
        var host = location.origin.replace(/^http/, 'ws');
        var socket = this.socket = io(host);
      }

      emitProgress(slide) {
        this.socket.emit('updateProgress', slide.step);
      }

      onProgressUpdate(eventListener) {
        this.socket.on('updateProgressList', eventListener);
      }
    }

    export default SocketService;

Socket.IO uses two ways of communicating using sockets, ```(socket).emit()``` and ```(socket).on()```. The former sends messages, by taking in the message and data (if any) to be passed to the server, while the latter receives updates from the server. To process the updates we pass a callback function that exposes whatever data is passed from the server.

In our service we've implemented the listeners so that they're supplied by the utilizing components, in effect delegating the handling of logic (another fine use of callback functions).

We include this service into our growing application environment by adding the following in ```src/app.js```:

    import SocketService from './services/socket.service';
    angular.module('workshop').service('socketService', SocketService);

As we need to tell the server when we navigate throughout our slides, we can again make use of ```src/services/slides.service.js```:

    class SlidesService {
      constructor($state, slidesFactory, $rootScope, socketService) {
        [...]
        $rootScope.$on('$stateChangeSuccess', function (event, state) {
          [...]
          socketService.emitProgress(state.slide);
        });
      }

      [...]
    }