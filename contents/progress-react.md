---
title: Setting up React components for the progress directive
short: Progress (component)
template: slide.jade
---

As with the index component, we want to divide our progress component into two parts; the list and the list item.

The list item is a very easy component (in ```src/directives/components/ProgressItem.jsx```):

    import React from 'react';

    class ProgressItem extends React.Component {
      render() {
        return (
          <li key={this.props.key}>Slide {this.props.step} ({this.props.number})</li>
        );
      }
    }

    export default ProgressItem;

The component needs three properties set, namely _key_, _step_, and _number_. Lets do this in ```src/directives/components/Progress.jsx```:

    import React from 'react';
    import ProgressItem from './ProgressItem.jsx!';

    class Progress extends React.Component {
      render() {
        var slides = this.props.slides;
        var steps = this.props.steps.map(function (number, index) {
          return number 
            ? <ProgressItem key={index} step={slides[index].step} number={number} />
            : null;
        });
        return (
          <div>
            <h2>Progress</h2>
            <ul>
              {steps}
            </ul>
          </div>
        );
      }
    }

    export default Progress;

This component ensures that the represented slide actually have a number; if not, it ignores the element. It needs two properties to be set, namely _slides_ and _steps_. This is to be supplied by the progress directive.