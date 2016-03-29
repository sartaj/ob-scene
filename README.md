ob-scene
=========

[![npm status](http://img.shields.io/npm/v/ob-scene.svg)](https://www.npmjs.org/package/ob-scene)
[![dependency status](https://david-dm.org/sartaj/ob-scene.svg)](https://david-dm.org/sartaj/ob-scene)

![obscene!](./docs/assets/obscene-logo.png)


Create interactive infographics with parallax, autoplay, and slide capabilities. Designed as a reactive animation engine.

## Features
* Synchronizes scroll with time.
* Allow for multiple things to synchronize, including scroll, play, slides, and sound.

## Goals
***Design:*** Explore the design possibilities of multi-interaction interactive infographics.

***Engineering:*** Explore the capabilities of a reactive web animation engines.

## Roadmap
***v1.0.0***
* Switch to virtual dom system for rendering.
* Synchronized sound support.
* Slideshow demo.
* Storytelling demo.
* Art Demo.
* Argument demo.
* Add tests.
* Add documentation.

## Backlog
* Support for other js libraries (d3.js).
* Create local scope for dom (currently requires `<body>`).
* Create local scope for js (`obscene` currently requires global variable `obscene_compiled`).
* Lazy-load buffering for scenes.
