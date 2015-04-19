---
title: Planning the index component
short: Index (planning)
template: slide.jade
---

The index component will be very similar to the navigation component, so we don't need much planning. But there are some differences important to note:

* We want to keep track of the active slide.
* The index is a list of slides, which should be expressed with two components: One for the list itself, and another for the list items.

The directive itself is very similar to the navigation directive; It ties all our modules together, and it needs to re-render upon state-change.