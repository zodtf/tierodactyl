<div align="center">

```
             ▄▄                                  ▄▄                                   ▄▄  
███▀▀██▀▀███ ██                                ▀███                  ██             ▀███  
█▀   ██   ▀█                                     ██                  ██               ██  
     ██    ▀███   ▄▄█▀██▀███▄███  ▄██▀██▄   ▄█▀▀███  ▄█▀██▄  ▄██▀████████▀██▀   ▀██▀  ██  
     ██      ██  ▄█▀   ██ ██▀ ▀▀ ██▀   ▀██▄██    ██ ██   ██ ██▀  ██  ██    ██   ▄█    ██  
     ██      ██  ██▀▀▀▀▀▀ ██     ██     █████    ██  ▄█████ ██       ██     ██ ▄█     ██  
     ██      ██  ██▄    ▄ ██     ██▄   ▄██▀██    ██ ██   ██ ██▄    ▄ ██      ███      ██  
   ▄████▄  ▄████▄ ▀█████▀████▄    ▀█████▀  ▀████▀███▄████▀██▄█████▀  ▀████   ▄█     ▄████▄
                                                                           ▄█             
                                                                         ██▀              
```

> #### **WARNING:** This project is still in development and is not yet ready for `ANY` use.
> > _Heavily `ChatGPT-4` assisted development_ 

</div>

---
# 🥉🥈🥇 Tierodactyl 🥇🥈🥉
### `Pterodactyl Hierarchy Update System`
This project consists of a `Node.js` application for managing server file updates based on a hierarchical `external id` system and a `Pterodactyl` addon for interfacing with the core application. The application can be run headless as a CLI tool or integrated with the `Pterodactyl panel` using the provided addon.

## 💡 INSPIRATION & MOTIVATION
> I was lazy and needed a tool to automate the process of updating my servers. 
> I'm not sure how many times I'll have to use this tool to justify the time I spent making it, but I'm sure I'll find a use for it eventually...
> 
> **THEN** I also made the acquaintance of [@Tolfx](https://github.com/Tolfx) by making him a Cheeto Beard (C:)  
> He's an extremely intelligent dude, and his `@father-tf/UpdateManager` project is the inspiration for this project, if there is one.  
> Go check out his work, or his `TF2 Dodgeball` servers if you're in the EU! 
> 
> [@zudsniper](https://github.com/zudsniper)

---
## 📦 Prerequisites

- `nodejs` 14.x or later
- `npm` 6.x or later
- `pterodactyl panel` 1.x
- `PHP` 7.4 or later
- `Composer` (for `PHP`)

---

## 🧫 Overview
This application is built in two parts: 
1. A `Node.js` application that fetches the servers from the `Pterodactyl` panel and updates them based on the hierarchy system.  
   > This can be run headless as a CLI tool or...
2. A `Pterodactyl` addon that provides an interface for the core application.   
   > This addon can be installed on the Pterodactyl panel and used to manage the servers.

---

## 🥚 Installation

### A. `TieroCore`
_Core Application_

1. Clone the repository.

```bash
$ git clone https://github.com/zodtf/tierodactyl.git
$ cd tierodactyl
```

2. Install the `Node.js` dependencies.

```bash
$ npm install
```

3. Create a `.env` file in the root directory of the project and configure the required environment variables.
> Note: The `HIERARCHY_MASTER_DIR` value should be the path to the directory containing the hierarchy files. 
> It does NOT however need to be a local directory. It can be a remote directory, so long as that directory as `autoindex` enabled.  
  
```dotenv
PTERODACTYL_API_KEY=your_pterodactyl_api_key
PTERODACTYL_PANEL_URL=https://your.pterodactyl.panel
HIERARCHY_MASTER_DIR=/path/to/your/hierarchy/master/dir
```

---

### B. `Dactyl`
_Pterodactyl Panel Addon_  

1. Change to the `dactyl` directory.

```bash 
$ cd tierodactyl/dactyl
```

2. Install the PHP dependencies.

```bash
$ composer install
```

3. Register the addon with the `Pterodactyl panel` by adding the addon's service provider to the `providers` array in `config/app.php`.
> `TODO` WTF is this PHP shit?  
> [@zudsniper](https://github.com/zudsniper)

```php
YourAddonNamespace\YourAddonServiceProvider::class,
```

4. Publish the addon's assets.

```bash
$ php artisan vendor:publish --tag=your-addon-assets
```

---

## 🍳 Usage

### Running the Core Application as a CLI Tool

1. Run the core application to fetch the servers and update them based on the hierarchy system.

```bash
$ npm start
```


### Using the Pterodactyl Addon

1. Log in to your Pterodactyl panel and navigate to the addon's route (e.g., `/your-addon`).

2. Set the `HIERARCHY_MASTER_DIR` value in the input field and click the "Update Servers" button to update the server files according to the hierarchy system.

3. Use the addon's interface to perform other operations, such as viewing live terminal output, handling wildcards, and more.

## 🧽 Testing
> This section is **HEAVILY** under construction.

This project includes unit and integration tests using `Jest`. To run the tests, execute the following command:

```bash
$ npm test
```

## License

This project is licensed under an ISC license. See the [LICENSE](LICENSE) file for more information.  

<hr>

<i><code>zod.tf</code></i>

[![Discord](https://img.shields.io/discord/974855479975100487?label=tf2%20discord)](https://discord.gg/zodtf)  ![GitHub issue custom search](https://img.shields.io/github/issues-search?color=114444&label=issues&query=involves%3Azudsniper)  ![GitHub followers](https://img.shields.io/github/followers/zudsniper?style=social)

> _fullstack development, server administration, web design, branding creation, musical composition & performance, video editing, and more probably_

<a href="https://zod.tf/"><img src="https://user-images.githubusercontent.com/16076573/222953031-03f44756-03bf-46b9-b66e-98d50dc013fc.png" alt="second zod.tf logo" width="150rem" style="max-width: 100%;"></a>
