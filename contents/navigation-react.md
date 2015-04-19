---
title: Using React with the navigation directive
short: Navigation (component)
template: slide.jade
---

React is a powerful abstraction of the UI in web applications. In addition to rendering whatever we tell it to the DOM, it maintains **React (Virtual) DOM** that enables it to do some logic into when it should render and what that should be rendered. This makes it very fast.

Angular in comparison renders whole parts of the DOM whenever changes are processed. For example, if we had implemented our directives with normal Angular templates, it would rerender the whole index-list every time we changed state. But instead when we use React, it limits the re-rendering to just the parts that actually change (i.e. the class active swithing to another list-item).

React components can be implemented using plain JavaScript or JSX, which is JavaScript syntax extension that looks similar to XML. We'll be using the latter for this application, as it is much easier to extend once we got it up and running (which is already set up for our working environment). Using plain JavaScript when writing React components are simply put very annoying to work with.

To write using JSX we save our files with the file extension ```.jsx```. This in combination with importing the file with ```<whatever-file-path>.jsx!``` tells SystemJS (our module loader) that this file should be transpiled into plain JavaScript.

Lets start by putting some code into ```src/directives/components/Navigation.jsx```:

    import React from 'react';

    class Navigation extends React.Component {
      render() {
        var back;
        if (this.props.previous) {
          back = <a href={this.props.previous.url} rel="prev">
            Previous: {this.props.previous.title}
          </a>;
        }
        var next;
        if (this.props.next) {
          next = <a href={this.props.next.url} rel="next">
            Next: {this.props.next.title}
          </a>;
        }
        return (
          <nav>
            {back}
            {next}
          </nav>
        );
      }
    }

    export default Navigation;

Now, lets look at what this code does:

1.  We import React and enable its methods in our code.
2.  We create a [React class](https://facebook.github.io/react/docs/top-level-api.html#react.createclass) and assign it to the variable ```Navigation```. A React class represents the logic within a given component, and should always have a render-method.

    React classes can later on be used with ```React.createElement()`` that takes the class as its first parameter, and an object that represents properties as the second. We'll come back to how these properties can be assigned to [React element](https://facebook.github.io/react/docs/top-level-api.html#react.createelement).
3.  We make use of properties given to the class, which are available at ```this.props.previousState``` and ```this.props.nextState```. These will refer to ```slide.previous``` and ``slide.next``` respectively.
4.  Last, we return the components expressed as a nav-element (components must always return a single top-most element), which have whichever link-elements that are available.