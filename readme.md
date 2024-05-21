## @mpv-easy/mpsm-scripts
This repository is responsible for maintaining commonly used js scripts and making them installable via [@mpv-easy/mpsm](https://github.com/mpv-easy/mpv-easy/tree/main/mpv-mpsm). Each script can be used individually or in combination, and will try to avoid functional conflicts caused by multiple scripts.


```bash
npm i @mpv-easy/mpsm -g

# set mpv script dir first!
mpsm set-script-dir '<your-mpv-dir>/portable_config/scripts'

# print mpv script dir
mpsm get-script-dir


# install script from @mpv-easy/mpsm github repo
mpsm install speed
mpsm uninstall speed

# install script from url
mpsm install "<your-script-url>"

# list installed scripts
mpsm list

# update a installed script
mpsm update speed

# update all installed scripts
mpsm update --all
```

## script
### meta info
In order to be recognized by mpsm, you need to add some information at the beginning of the script

We use the idea similar to the tampermonkey script.
```js
// ==UserScript==
// @name         autoload
// @version      0.1.1
// @description  Automatically load playable files
// @author       mpv-easy
// @downloadURL  https://github.com/mpv-easy/mpsm-scripts/releases/latest/download/autoload.js
// ==/UserScript==


print("hello autoload script")
```
### add a new script
You can add new script to [scripts.json](./scripts.json) by submitting a PR
Or
```bash
mpsm install htpp://<your-script-url>
```
### script name
The script file name should be consistent with the script name in meta, in order to avoid problems in some extreme cases. If you encounter problems, please open an issue