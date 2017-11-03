# Vue Source

## Overview

Vue Source is a global mixin that adds HTML comments to the DOM to identify your app's components:

![inspector](https://user-images.githubusercontent.com/132681/32379406-5c3b5528-c0a5-11e7-9eaf-50483e9a306d.png)


The plugin has various optional features:

- render comments as component tags, or file paths
- manual or automatic activation based on environment variable
- attach component Vue and file references to the DOM comments

## Installation and usage

Download via NPM:

```
npm install vue-source --save
```

Import and run from your main application file:

```js
import VueSource from 'vue-source'

VueSource.init()
```

The default settings are:

- render comments as component tags
- activate in development, but not in production
- do not attach component and file references to rendered comments


## Settings

You can pass settings to `init()` to change Vue Source's behaviour:

```js
import VueSource from 'vue-source'

VueSource.init({
  type: 'file',
  active: true,
  debug: true
})
```

### Type

Render component tags or file paths:

>  `type` : `('component'|'file')`

Component tags:

![comment-component](https://user-images.githubusercontent.com/132681/32379414-6133e022-c0a5-11e7-9194-cc72a1dc558d.png)

File paths:

![comment-file](https://user-images.githubusercontent.com/132681/32379421-64c238ec-c0a5-11e7-96d0-1953ee64242c.png)

Where files don't exist (i.e router links) the component names will be rendered instead.


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

Set `debug` to `true` if you want to enable this functionality.

Once enabled, the plugin attaches a `file` and `vue` reference to the DOM comment, which you can access in your browser's devtools, **by first inspecting the comment**, then referencing in the console using `$0`:


![debug](https://user-images.githubusercontent.com/132681/32379425-68121008-c0a5-11e7-8e4f-055d3684bc46.png)
