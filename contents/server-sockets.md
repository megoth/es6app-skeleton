---
title: A Protocol for messages to use with our sockets
short: Server (sockets)
template: slide.jade
---

We won't go into the details of the server here (check out the bonus slide if you want to know more), but we will look at the messages that we support across the server and the client.

## From client to server

These are the commands that the client can use to notify the server.

* **updateProgress:** This command tells the server which slide the client is currently visiting. It supplies one variable, which is the index of the current step the user is on.
* **isAskingForHelp:** This command updates the server whether or not the user needs help. It supplies two variables, the username and a boolean telling whether or not the user needs help.

## From server to client

The server keeps track of all connections made from clients, and sends out regular updates to all of its connected clients.

*   **updateProgressList:** This command gives the client the list of progress made by the visitors of the application. The list is sorted by the index of the slides, and each entry gives the number of visitors.

    An example: ```[null, 2, 1]``` says that there a no users at slide 0, 2 users in slide 1, and 1 user in slide 2.
*   **updatePleadsList:** This command supplies the list of users currently in need of help. The list is sorted by the index of the slides.
    
    An example: ```[{username: 'foo', progress: 1}, {username: 'bar', progress: 2}]``` tells us that the users foo and bar is in need of help, respectively at slide 1 and slide 2.