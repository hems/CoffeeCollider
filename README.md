# CoffeeCollider [![Build Status](https://travis-ci.org/mohayonao/CoffeeCollider.png?branch=master)](https://travis-ci.org/mohayonao/CoffeeCollider) [![Coverage Status](https://coveralls.io/repos/mohayonao/CoffeeCollider/badge.png?branch=master)](https://coveralls.io/r/mohayonao/CoffeeCollider?branch=master) [![Dependency Status](https://david-dm.org/mohayonao/CoffeeCollider.png)](https://david-dm.org/mohayonao/CoffeeCollider)

CoffeeCollider is a language for real time audio synthesis and algorithmic composition in HTML5. The concept of this project is designed as "write CoffeeScript, and be processed as SuperCollider."

## Installation
node.js
```sh
npm install -g coffee-collider
coffeecollider -e "(->SinOsc.ar([440,442])).play()"
```

bower
```sh
bower install coffee-collider
```

## Features
- Over 150 unit generators which are almost same as SuperColldier's
- Operator overloading
- Syncronized task function
- Client-Server architecture on WebWorker
- Run anywhere. supporting Chrome/Firefox/Safari/Opera/IE(flashfallback), iOS/Android and node.js

## Examples
Open the below links, and press the "Run" button.

- [noise](http://mohayonao.github.io/CoffeeCollider/#noise.coffee)
- [sequence](http://mohayonao.github.io/CoffeeCollider/#sequence.coffee)
- [chord](http://mohayonao.github.io/CoffeeCollider/#chord.coffee)
- [khoomii](http://mohayonao.github.io/CoffeeCollider/#khoomii.coffee)

## Documents

https://github.com/mohayonao/CoffeeCollider/wiki/_pages

## Inspired from
- [CoffeeScript](http://coffeescript.org/)
- [SuperCollider](http://supercollider.sourceforge.net/)
