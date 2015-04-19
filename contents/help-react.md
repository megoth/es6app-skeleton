---
title: Setting up React components for help queue directive
short: Help queue (component)
template: slide.jade
---

The help queue component consists of three parts - the list, the list items, and the button. As most of them repeat the same patterns as before, I'll just dump the code-snippets here.

## The list

The list takes the properties users, that refers to the users needing help, and handleUserInput, which is a function that is to be called whenever the user needs help.

```src/directives/components/HelpQueue.jsx```:

    import React from 'react';
    import HelpButton from './HelpButton.jsx!';
    import HelpUser from './HelpUser.jsx!';

    class HelpQueue extends React.Component {
      render() {
        var users = this.props.users.map(function (user, index) {
          return <HelpUser key={index} user={user} />
        });
        return (
          <div>
            <h2>Help queue</h2>
            <ul>
              {users}
              <HelpButton onClick={this.props.handleUserInput}></HelpButton>
            </ul>
          </div>
        );
      }
    }

    export default HelpQueue;

## The list-item

```src/directives/components/HelpUser.jsx```:

    import React from 'react';

    class HelpUser extends React.Component {
      render() {
        return (
          <li key={this.props.key}>
            {this.props.user.username} ({this.props.user.progress})
          </li>
        );
      }
    }

    export default HelpUser;

## The button

```src/directives/components/HelpButton.jsx```:

    import React from 'react';

    class HelpButton extends React.Component {
      handleClick() {
        this.username = this.getUsername();
        if (!this.username || this.username === '') {
          return;
        }
        this.isAskingForHelp = !this.isAskingForHelp;
        this.props.onClick(this.username, this.isAskingForHelp);
      }

      getUsername() {
        return this.username || prompt('Please enter a username');
      }

      render() {
        var buttonText = this.isAskingForHelp ? 'I\'m good' : 'I need help';
        return (
          <form>
            <button onClick={this.handleClick.bind(this)} type="button">
              {buttonText}
            </button>
          </form>
        );
      }
    }

    export default HelpButton;

The important thing to note here is how we've added two additional methods to HelpButton, _handleClick_ and _getUsername_. The former is called from the render-method, and what's important here is to note the use of ```Function.prototype.bind```. This is a method that allows us to override the default _this_-variable in a given function. Without getting to much into it (_this_ can be really confusing in JS at times), it allows us to ensure that the context that handleClick runs in refers to the same as render().

Also note the use of the property onClick; this is a function passed down from HelpQueue, which in turn will get it from the HelpQueueDirective. This is the function that handles whenever the user clicks the button for help. It takes a username and a boolean that refers the toggling boolean of the users need of help.