---
title: Setting up services for help queue
short: Help queue (service)
template: slide.jade
---

For the help queue component we need to add the protocols pertaining to that functionality. Lets do so by adding the following to ```src/services/socket.service.js```:

    class SocketService {
      [...]

      emitAskingForHelp(username, isAskingForHelp) {
        this.socket.emit('isAskingForHelp', username, isAskingForHelp);
      }

      onPleadsUpdate(eventListener) {
        this.socket.on('updatePleadsList', eventListener);
      }
    }

This follows the same pattern as the previous methods in SocketService.