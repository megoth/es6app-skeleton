---
title: Bonus - How the server works
short: Bonus (server)
template: slide.jade
---

The server resides in ```server.js``` and can be run using ```node server```. The following is a breakdown of the script:

    var path = require('path');
    var express = require('express');
    var app = express();
    var port = process.env.PORT || 8282;

    var staticPath = path.resolve(__dirname, '.');
    app.use(express.static(staticPath));

This sets up the Express server, and tells it to simply relay the files that are located in the same folder as the script.

The ```process.env.PORT``` is important when we want to use our application with Heroku. This gives the port that Heroku internally prepares for the application.

    var socket = require('socket.io');
    var io = socket.listen(app.listen(port));
    var sockets = [];

This part sets up the basics for our sockets. The second line tells Socket.IO to expose itself to the client. As we maintain a list of connections to the server, we prepare that with an empty array.

    io.sockets.on('connection', function (socket) {
      // setup
      sockets.push(socket);
      // events
      socket.on('isAskingForHelp', function (username, isAskingForHelp) {
        socket.username = username;
        socket.isAskingForHelp = isAskingForHelp;
      });
      socket.on('updateProgress', function (slideStep) {
        socket.step = slideStep;
      });
    });

This handles all incomming connections. We add the data given from clients to the socket, so that we can reuse those later on. (It might be a bit hacky, but it works.) When we iterate over our sockets later on, we have all the info we need.

    setInterval(function () {
      sockets = sockets.filter(function (socket) {
        return socket.connected;
      });
      emitPleads(sockets);
      emitProgress(sockets);
    }, 100);

Once every 100 milliseconds we update our clients with the latest updates. Our use of React to render components makes this a relatively safe thing to do in terms of performance. If we've used standard Angular-functionality to render the views, we would have constant rerendering.

    // plead functionality
    function emitPleads(sockets) {
      var pleads = getPleadList(sockets);
      pleads.sort(function (a, b) {
        return a.progress - b.progress;
      });
      sockets.forEach(function (socket) {
        socket.emit('updatePleadsList', pleads);
      });
    }

    function getPleadList(sockets) {
      return sockets.filter(function (socket) {
        return socket.isAskingForHelp;
      }).map(function (socket) {
        return {
          username: socket.username,
          progress: socket.step
        }
      });
    }

These two functions handle the internal workings of the help functionality.

    // progress functionality
    function emitProgress(sockets) {
      var progressList = getProgressList(sockets);
      sockets.forEach(function (socket) {
        socket.emit('updateProgressList', progressList);
      });
    }

    function getProgressList(sockets) {
      var progress = [];
      sockets.forEach(function (socket) {
        var step = socket.step;
        progress[step] = (progress[step] || 0) + 1;
      });
      return progress;
    }

Lastly, these two functions handle the internal workings of the progress functionality.