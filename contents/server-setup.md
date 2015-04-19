---
title: Setting up dependencies for the socket server
short: Server (setup)
template: slide.jade
---

Until now we've used a simple http-server to serve static files. But for our next components we want to have asynchronous communication across multiple clients, which we'll implement using [WebSockets](https://developer.mozilla.org/en/docs/WebSockets). But this isn't supported with our simple server, so we need something else.

[Express](http://expressjs.com/) is a server framework that allows us to easily set up a http server, but which is also easy to extend. [Socket.IO](http://socket.io/) is a WebSockets implementation that is easy to set up with Express.

I've already created a server in ```server.js```, but I haven't installed Express and Socket.IO. Run the following to enable them in our application:

    npm install express
    npm install socket.io

(If we were to run these with ```--save``` or ```--save-dev``` as options, they would be added to ```package.json``` in addition.)

Our server is now ready to be run with Node:

    node server

(If you want ease your development with Node applications, I can recommend [nodemon](http://nodemon.io/), which restarts your node-applications whenever you save the files depended by the application.)

As a last step we need to expose Socket.IO to our frontend. Socket.IO automatically prepares a script at ```/socket.io/socket.io.js```, so we only need to include the following in ```index.html```:

    <script src="/socket.io/socket.io.js"></script>

This exposes ```io``` as a global variable. If we wanted to expose it as an Angular service, e.g. for testing purposes, we could do the following:

    class IOService {
      constructor($window) {
        return $window.io;
      }
    }

    export default IOService;

But for this workshop, we're satisfied with it being a global variable.