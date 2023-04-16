# tieroCore (`tiero`) CLI Specification

> [@rc4](https://github.com/rc4) -- how should we handle multiple same level merges? disallow for now, but imagine the case of like, minecraft, where you have  
> `mc.1_7_2.forge.[modpacks]`  
> like wouldnt it waste space to not keep forge / fabric as separate (and legally terminal -- fine to just have a forge server with no mods) on the same level as like,   
> the modpacks? wait NO because thats the point of the hierarchies it can just go under forge because a modpack would only support forge OR fabric generally   
> _(in our handled case)_    


## CONFIG FILE 

> ```
> 📁 mc
>   📁 .CONTENTS                     <-- this is REQUIRED in all subdomains recursively (except those with basename '.CONTENTS' or '.contents' obvs)
>     ⏺ start.sh   
>     📁 world
>     ☕ minecraft_server.jar
>     📄 eula.txt
>     📄 server.properties
> 📁 tf2
>   📁 .CONTENTS   
>   📁 comp
>     📁 .CONTENTS   
>     📁 mge
>       📁 .CONTENTS
>         📁 tf > 📁 addons > 📁 sourcemod  
>           📁 plugins
>             🔌 mge.smx
>           📁 configs
>             💾 {configs}
>   📁 casual     
>     📁 .CONTENTS   
> 🧰 tiers.yml  
> ```

---  

'tiero' is the CLI tool portion of the Tierodactyl project. 
this tool can perform 'init', 'deploy', and 'update' commands. 
a few env vars must be set, so we also need a 'config' command

### **USAGE**: `tiero {command [subcommand]} [name|layers] [name|layers] [flags]`

## FLAGS
`-k`|`--keep`: don’t overwrite TARGET with hierarchy ‘layers’ files when resolving conflicts 
`-n`|`--newer`: only overwrite TARGET with layers files iff TARGET file is newer (modified time) when resolving conflicts 
`-h`|`--help`: display this info  
`-v`|`--verbose`: change LOG_LEVEL to 'debug' 

## COMMANDS  
### `tiero init [**HIERARCHY_BASE_DIR**]` 
_(this should just be a variable, not actually pulling an env var cuz there are no env vars yet ostensibly)_        
  > initializes a new file at `HIERARCHY_BASE_DIR` called `tiers.yml` INTERACTIVELY  
  > > SOME interactivity should be skippable via `yes` command or `-y` -- so just always ask `[nN\yY]` in prompts (or provide a default)   
  > > _the env vars / important login info & path stuff are 
  > #### `tiero config init`  
  > creating `tiers.yml`...   
  >   set HIERARCHY BASE DIRECTORY: [input] [`ENTER`]   
// allow just [ENTER] here, and if that happens assume that HIERARCHY_BASE_DIR is "${cwd}" and write that to yaml.    
  >   set PTERODACTYL_API_KEY: [input] [`ENTER`]   
      
if you can make this: print the astericks instead of just not showing anything happening i will be a happy young lad  
  >   set PTERODACTYL_API_KEY: [input] [`ENTER`]  
maybe throw a while loop on this buddy and do some basic "is this a valid url?" checks like for `http(s)?`
or do something more intense and match (i think this is valid)   

```re
/([A-Za-z0-9](\.))+([A-Za-z0-9])/api/gn;
``` 

  >   set PTERODACTYL_PANEL_URL: [input] [`ENTER`]   
finishe with UNSKIPPABLE
  > ✅🔧 Configured.  
```ts  
IF "${HIERARCHY_BASE_DIR}/tiers.yml" already exists, prompt "[Y/n]" to overwrite it    
```  

  > set names? [y/N] `y`
    > we just determine whether or not we will use folder name as temporary 'pretty name' (default)   
    > OR if we stop & prompt for a name for all iterations  
```ts
RECURSE all files under `HIERARCHY_BASE_DIR`, ([ask for their "display names"] if ["set names" == yY]) and write them to `tiers.yml` file  
```
  > created `"${HIERARCHY_BASE_DIR}/tiers.yml"`.  
  > 🥂 cheers
```ts
exit(0)
// no fucking idea why i started using typescript highlighting my brain is rotted  
```

---  

### `deploy [layers] [ServerSpecifications] `~~`[flags]`~~ 
> seems for now we don't need flags here... that will change i think...     
    
**creates NEW server instances** -- this will require more variables / flags, or settings in `tiers.yml`, or i guess ideally for end-user would be copying from their previous servers by id...   
_(`layers` format is described [LATER](#layer-path))_  
`ServerSpecifications` ( _is more in depth... skip this command for now ig? or go hard_ )  
see the [pterodactyl api docs](https://dashflo.net/docs/api/pterodactyl/v1/#req_190b1006d60748abbeda37c7d407345a) <-- linked to "Create Server" 
> We should just require an Application level API key tbh  

### `update`  
**updates an EXISTING server instance; or multiple** 

#### `tiero update [name] [flags]`  
> I think this is all we need to supply for update, besides flags?   
  
`name` = the server id...  
i'm sorry  
$8# char $HEX$ id, can be found in the panel easily. **1 per server.**  

#### `all` argument  
this command has a special case!  
- if `tiero update all [flags]` is called, and `tiers.yml` is configured, then **ALL SERVERS** will be iterated & hierarchically **update** based on their **external_ids** -- which are their `layers_path`s. 
> YES I FOUND IT THE EXTERNAL_ID IS ONLY AVAILABLE TO APPLICATION API SO WE HAVE TO USE THAT BUT ITS REAL  
> that was scary  

### [Here are docs](https://dashflo.net/docs/api/pterodactyl/v1/#req_190b1006d60748abbeda37c7d407345a) which show retrieving the `external_id`. C:

---  


## ENV VARS  
```dotenv
PTERODACTYL_API_KEY=your_pterodactyl_api_key 
#^(get this from creating an API key via pterodactyl panel)  
PTERODACTYL_API_URL=https://your.pterodactyl.api.endpoint/api/ 
#^(probably `http[s]://panel.example.com/api/`)  
HIERARCHY_BASE_DIR=/path/to/your/hierarchy/base/dir   
#^(the path to your base dir, we call it `hierarchy_base_dir` or `hierarchy_entrypoint` or some shit)  
```

## INFO
name = pterodactyl **server id** (maybe we should call it id 😅)
layers = pterodactyl **server external id** (might be called name? i need to make an API query to a server with a external id once i put my shit back up and see b/c im pretty sure it’s different than `name`: regardless, BOTH ARE DIFFERENT 
> I need to get my panel up again & then check if, after manually setting an external id from the webpanel (as they are not set by default) I receive an output from /list_servers' that contains `external_id` **at the server level**  

## LAYER PATH 
`layers` must match the following regular expression.
```re
/^(([A-Za-z0-9\-_]+)(\.)?)+/gn  
```

each `layer` is capture group 1 (capture group 0 is the whole thing) & so on but not like 1-n because the capture groups recurse inwardly so j dont parse with fucking regex ~~fuck i don’t remember how sub capturegroups work~~ _(I remembered)_
> how to parse HTML with regex?  
  
essentially just a string with conds
- ignore if begins “.”
- contains 1 or more layers: strings, separated by . (no ending . after last layer)

## EXAMPLES

ex: `tf2.comp.mge` ✅

## OVERWRITE 
**when files differ between TARGET and LAYER_COMPILE files**   
> default function is `OVERWRITE` with TARGET files. options (`-k`, `-n`) can be used to change this functionality.   
> 
default conflict resolution is ALWAYS OVERWRITE with layers files!

---  

Thank you sincerely mr. daemon for anything you do, regardless of if you finish. If you finish it in `perl`, I will learn `perl` to maintain and use.   
💟 [@rc4](https://github.com/rc4)   

<hr>

<i><code>zod.tf</code></i> 

[![Discord](https://img.shields.io/discord/974855479975100487?label=tf2%20discord)](https://discord.gg/zodtf)  ![GitHub issue custom search](https://img.shields.io/github/issues-search?color=114444&label=issues&query=involves%3Azudsniper)  ![GitHub followers](https://img.shields.io/github/followers/zudsniper?style=social)  

> _fullstack development, server administration, web design, branding creation, musical composition & performance, video editing, and more probably_   

<a href="https://zod.tf/"><img src="https://user-images.githubusercontent.com/16076573/222953031-03f44756-03bf-46b9-b66e-98d50dc013fc.png" alt="second zod.tf logo" width="150rem" style="max-width: 100%;"></a>