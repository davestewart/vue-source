# Vue Source

## Overview

Vue Source is a global Vue mixin which identifies components in source code by adding HTML comments:

![inspector](https://user-images.githubusercontent.com/132681/32379406-5c3b5528-c0a5-11e7-9eaf-50483e9a306d.png)


The plugin has various optional features:

- render comments as class names, tags, or file paths
- manual or automatic activation based on environment variable
- attach JavaScript references to DOM comments
- inspect in Vue Devtools v4

## Installation and usage

Download via NPM:

```
npm install vue-source --save
```

Import and run from your main application file:

```js
import VueSource from 'vue-source'

Vue.use(VueSource)
```

The default settings are:

- render comments as class names
- activate in development, but not in production
- attach component and file references to rendered comments


## Settings

You can pass settings to `Vue.use()` to change Vue Source's behaviour:

```js
import Vue from 'vue'
import VueSource from 'vue-source'

Vue.use(VueSource, {
  type: 'file',
  active: true,
  debug: true
})
```

### Type

Render comment as class name, file path, or source code tag:

>  `type` : `('class'|'file'|'tag')`

Class names:

![comment-class](https://user-images.githubusercontent.com/132681/36078037-9105de14-0f69-11e8-829c-761143a3c1c8.png)

File paths:

![comment-file](https://user-images.githubusercontent.com/132681/32379421-64c238ec-c0a5-11e7-96d0-1953ee64242c.png)

Tags:

![comment-component](https://user-images.githubusercontent.com/132681/32379414-6133e022-c0a5-11e7-9194-cc72a1dc558d.png)

Where files don't exist (i.e router links) the plugin will attempt to render classes or tags instead.


### Active

Activate or disable at startup:

>  `active` : `('auto'|true|false|expression)`

Pass:

- `'auto'` (the default) which checks `process.env.NODE_ENV` to run in anything except `production`
- `true` to always enable
- `false` to always disable
- any other expression which evaluates to `true/false` to choose whether to enable

### Debug

Attach references to the rendered comment:

> `debug` : `(true|false)`

By default, the plugin attaches the following references to the DOM comment:


- `vm`: the Vue instance
- `tag`: the markup tag
- `file`: the source file path
- `class`: the source class name
- `inspect()`: a function to inspect the component in Vue's DevTools (v4 feature)

To access these references in your browser's Vue Devtools:

1. inspect the HTML comment in the Elements panel
2. reference it in the Console via `$0`

![debug](https://user-images.githubusercontent.com/132681/32379425-68121008-c0a5-11e7-8e4f-055d3684bc46.png)

Set `debug` to `false` if you want to disable this functionality.
