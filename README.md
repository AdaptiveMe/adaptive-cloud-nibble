# Adaptive Device Simulator (Nibble)

[![Build Status](http://i.4dp.me/travis/AdaptiveMe/adaptive-cloud-nibble.svg?branch=master)](https://travis-ci.org/AdaptiveMe/adaptive-cloud-nibble)
[![Github Tag](http://i.4dp.me/github/tag/AdaptiveMe/adaptive-cloud-nibble.svg)](https://github.com/AdaptiveMe/adaptive-cloud-nibble/tags) 
[![Github Release](http://i.4dp.me/github/release/AdaptiveMe/adaptive-cloud-nibble.svg)](https://github.com/AdaptiveMe/adaptive-cloud-nibble/releases) 
[![Npm release](http://i.4dp.me/npm/v/adaptive-cloud-nibble.svg)](https://www.npmjs.com/package/adaptive-cloud-nibble) 
[![Dependency Status](http://i.4dp.me/david/AdaptiveMe/adaptive-cloud-nibble.svg)](https://david-dm.org/AdaptiveMe/adaptive-cloud-nibble) 
[![devDependency Status](http://i.4dp.me/david/dev/AdaptiveMe/adaptive-cloud-nibble.svg)](https://david-dm.org/AdaptiveMe/adaptive-cloud-nibble#info=devDependencies)

[![Adaptive Runtime Platform](https://raw.githubusercontent.com/AdaptiveMe/AdaptiveMe.github.io/master/assets_v2/wordmark-adaptive-spectrum-1173x256.png)](#)

Adaptive Nibble is a mobile device simulator for hybrid-app development. It allows you to use the emulator during the development to preview your app as you develop it and it also emulates calls to the Adaptive Runtime Platform APIs. This is the **stand-alone** Adaptive Nibble installer for NodeJS. 

[![Adaptive Nibble Screenshot](https://raw.githubusercontent.com/AdaptiveMe/AdaptiveMe.github.io/master/assets/screenshots/nibble-screenshot.png)](#)

## Installation

Install this globally and you'll have access to the **nibble** command anywhere on your system.

``` 
npm install -g adaptive-cloud-nibble
```

## Usage

To launch the nibble application for emulation a url or a local ebsite on your machine, just launch:

``` 
nibble -p http://www.google.com
nibble -p <some_local_path>/index.html -w true
```

For showing all the options of the nibble, print the help command

```
nibble -h
``` 

### About Adaptive Runtime Platform

Hybrid apps are applications that are built using HTML5/CSS3/JavaScript web technologies and use a native "containers" to package the app to enable access to the native functionalities of a device. In essence, you can write a rich mobile/wearable/tv application using HTML and JavaScript and package that application as a native app for multiple mobile/wearable/tv platforms and distribute them on the different app stores and markets.

The Adaptive Runtime Platform (ARP) provides these native "containers" to package apps for the main mobile, wearable and desktop platforms... and other platforms as they emerge. Adaptive Runtime Platform (ARP) and sub-projects are open-source under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html). The Adaptive Runtime Platform (ARP) project was created by [Carlos Lozano Diez](https://github.com/carloslozano) as part of the [adaptive.me](http://adaptive.me) set of products.

Please refer to the [project site](http://adaptiveme.github.io) for more information.

## Work Backlog

#### Board: [![Stories in Ready](https://badge.waffle.io/AdaptiveMe/adaptive-cloud-nibble.svg?label=ready&title=Ready)](https://waffle.io/AdaptiveMe/adaptive-cloud-nibble)

[![Throughput Graph](https://graphs.waffle.io/AdaptiveMe/adaptive-cloud-nibble/throughput.svg)](https://waffle.io/AdaptiveMe/adaptive-cloud-nibble/metrics)

## Contributing

We'd *love to accept your patches and contributions to this project*.  There are a just a few small guidelines you need to follow to ensure that you and/or your company and our project are safeguarded from inadvertent copyright infringement. I know, this can be a pain but we want fair-play from the very start so that we're all on the same page. Please refer to the [project site](http://adaptiveme.github.io) for more information.

## Attributions

* Adaptive Runtime Platform (ARP) artwork by [Jennifer Lasso](https://github.com/Jlassob).
* Project badge artwork by [shields.io](http://shields.io/).
* All other logos are copyright of their respective owners.

## License
All the source code of the Adaptive Runtime Platform (ARP), including all Adaptive Runtime Platform (ARP) sub-projects curated by [Carlos Lozano Diez](https://github.com/carloslozano), are distributed, and must be contributed to, under the terms of the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html). The [license](https://raw.githubusercontent.com/AdaptiveMe/adaptive-arp-api/master/LICENSE) is included in this [repository](https://raw.githubusercontent.com/AdaptiveMe/adaptive-arp-api/master/LICENSE).

Forged with :heart: in Barcelona, Catalonia · © 2013 - 2015 [adaptive.me](http://adaptive.me) / [Carlos Lozano Diez](http://google.com/+CarlosLozano).

