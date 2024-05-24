## @mpv-easy/mpsm-scripts

This repository is responsible for maintaining commonly used js scripts and making them installable via [@mpv-easy/mpsm](https://github.com/mpv-easy/mpv-easy/tree/main/mpv-mpsm). Each script can be used individually or in combination, and will try to avoid functional conflicts caused by multiple scripts.

## meta info

In order to be recognized by mpsm, you need to add some information at the beginning of the script

We use the idea similar to the tampermonkey script.

### js
```js
// ==UserScript==
// @name         autoload
// @version      0.1.1
// @description  Automatically load playable files
// @author       mpv-easy
// @downloadURL  https://github.com/mpv-easy/mpsm-scripts/releases/latest/download/autoload.js
// ==/UserScript==

```
### lua
```lua
-- ==UserScript==
-- @name         autoload
-- @version      0.1.1
-- @description  Automatically load playable files
-- @author       mpv-easy
-- @downloadURL  https://github.com/mpv-easy/mpsm-scripts/releases/latest/download/autoload.js
-- ==/UserScript==

```
## add a new script

### scripts.json
If your script already has meta info, you can add it directly to the [scripts.json](./scripts.json)
```json
"speed": "https://github.com/mpv-easy/mpsm-scripts/releases/latest/download/speed.js",
```
### meta.(js|lua)
If there is no meta info in the script, you can create a meta info file in [meta](./meta) and then add the meta info file to [scripts.json](./scripts.json)
```json
"open-file-dialog": "https://github.com/mpv-easy/mpsm-scripts/releases/latest/download/open-file-dialog.meta.lua",
```
## script name

The script file name should be consistent with the script name in meta, in order to avoid problems in some extreme cases. If you encounter problems, please open an issue

## dev

### fish

```fish
set -x MPV_SCRIPT_DIR=/your_mpv_dir/portable_config/scripts ; pnpm run dev
```

### bash

```bash
export MPV_SCRIPT_DIR=/your_mpv_dir/portable_config/scripts && pnpm run dev
```
