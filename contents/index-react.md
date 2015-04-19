---
title: Creating the React components for the index directive
short: Index (components)
template: slide.jade
---

Lets start by inserting the code for ```src/directives/components/Index.jsx```:

    import React from 'react';
    import Slide from './Slide.jsx!';

    class Index extends React.Component {
      render() {
        var slides = this.props.slides.map(function (slide, index) {
          return <Slide key={index} slide={slide} />;
        });
        return (
          <nav>
            <h2>Index</h2>
            <ul>
              {slides}
            </ul>
          </nav>
        );
      }
    }

    export default Index;

This code does much of the same as for the navigation component. But there are some additions:

1. It imports another React component, namely ```Slide.jsx```; we'll go through that one next
2. It makes use of the Slide component as a tag, and supplies the properties as attributes
3. It also makes use ```Array.prototype.map```, which is to show that everything you can do in plain JavaScript can also be done in JSX-files (as they are extensions for plain JS).

Next, the code for ```src/directives/components/Slide.jsx```:

    import React from 'react';

    class Slide extends React.Component {
      render() {
        return (
          <li className={this.props.slide.active ? 'active': ''} 
              key={this.props.key}>
            <a href={this.props.slide.url}>{this.props.slide.short}</a>
          </li>
        );
      }
    }

    export default Slide;

Something to note in this code is the use of the key-attribute. When you insert React components into other React components, React advices you to add a key to your child components, to make debugging easier.

It also makes use of a [conditional (ternary) operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator), which has the syntax ```condition ? expr1 : expr2```, where expr1 is returned if the condition is true, and expr2 is returned if the condition is false. This is a handy function that's also available in many other programming languages.