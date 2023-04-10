# `Tierodactyl` Resources

This file contains resources for the project.

---

## 📚 Resources

- [`pterodactyl panel` Customization Documentation](https://pterodactyl.io/community/customization/panel.html)  
- [`pterodactyl panel` Standard API Documentation](https://pterodactyl.io/api/documentation.html)

--- 

## 📟 Dactyl Steps
_straight from `ChatGPT-4`'s ... mouth?_  

### `[CHATGPT-4]` 

Creating a Pterodactyl addon involves working with PHP, Laravel, and Vue.js.
Here's an outline of how to create a simple addon that interfaces with the core application 
you've developed in Node.js and TypeScript

`1.` Create a new Laravel project following Ptero's documentation (idk which is the most up to date)  
   [ptero panel docs](https://pterodactyl.io/community/customization/panel.html)  
`2.` Define a new route and controller for your addon. 
   In your Laravel package's routes/web.php file, add the following:
   
```php
Route::group(['prefix' => 'your-addon'], function () {
    Route::get('/', 'YourAddonController@index');
});
```
`3.` Create a new controller, YourAddonController.php, with an index method that returns the addon's view:

```php
namespace YourAddonNamespace;

    use Illuminate\Routing\Controller;
    
    class YourAddonController extends Controller
    {
        public function index()
        {
            return view('your-addon::index');
        }
    }
```

`4.` Create a new Vue.js component that will serve as the interface for your addon.   
In your package's `resources/js` directory, create a file named `YourAddon.vue`.  
In this component, you can add form inputs for setting the `HIERARCHY_MASTER_DIR` and triggering updates.  

```html
<template>
  <div>
    <h1>Your Addon</h1>
    <form @submit.prevent="updateServers">
      <label for="hierarchy-master-dir">Hierarchy Master Directory:</label>
      <input id="hierarchy-master-dir" type="text" v-model="hierarchyMasterDir" />

      <button type="submit">Update Servers</button>
    </form>

    <!-- You can also add more UI elements here, like a live terminal, wildcard handling, etc. -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      hierarchyMasterDir: '',
    };
  },
  methods: {
    async updateServers() {
      // Call your core application's API or WebSocket to trigger updates
    },
  },
};
</script>

```

`5.` Register your `Vue.js` component in the `resources/js/app.js` file:  
```js
Vue.component('your-addon', require('./components/YourAddon.vue').default);
```

`6.` Create a new `Blade` view for your addon, `resources/views/index.blade.php`.  
In this view, include the `Vue.js` component you created earlier:  
```html
@extends('layouts.master')

@section('content')
    <div class="row mt-1">
        <div class="col-md-12">
            <your-addon></your-addon>
        </div>
    </div>
@endsection
```

`7.` Compile your `Vue.js` components and publish your package's assets:  
```bash
npm run production
php artisan vendor:publish --tag=your-addon-assets

```

This example outlines the basic structure of a `Pterodactyl` addon that interfaces with your core application.  
You will need to modify and expand upon this example based on your specific requirements,  
such as implementing live terminal output,  
                          wildcard handling,  
                      and error handling.  
Additionally, you will need to integrate the core application and the `Pterodactyl addon` by exposing functions   
from the core application as API endpoints or through a WebSocket connection.

> `ChatGPT-4` Poor thing has to do all this work later... sad

<hr>

<i><code>zod.tf</code></i>

[![Discord](https://img.shields.io/discord/974855479975100487?label=tf2%20discord)](https://discord.gg/zodtf)  ![GitHub issue custom search](https://img.shields.io/github/issues-search?color=114444&label=issues&query=involves%3Azudsniper)  ![GitHub followers](https://img.shields.io/github/followers/zudsniper?style=social)

> _fullstack development, server administration, web design, branding creation, musical composition & performance, video editing, and more probably_

<a href="https://zod.tf/"><img src="https://user-images.githubusercontent.com/16076573/222953031-03f44756-03bf-46b9-b66e-98d50dc013fc.png" alt="second zod.tf logo" width="150rem" style="max-width: 100%;"></a>
