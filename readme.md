## @mpv-easy/mpsm-scripts

This repository is responsible for maintaining commonly used js scripts and making them installable via [@mpv-easy/mpsm](https://github.com/mpv-easy/mpv-easy/tree/main/mpv-mpsm). Each script can be used individually or in combination, and will try to avoid functional conflicts caused by multiple scripts.

## MPV Script RFC

https://github.com/mpv-easy/mpv-easy/blob/main/blog/Revolutionizing-mpv-Scripting-A-New-Package-Format-Proposal.md

## add a new script

### scripts.json
Add script.json directly to the [scripts](./scripts)
```json
{
  "name": "green-screen",
  "download": "https://github.com/ahaoboy/green-screen/blob/main/green-screen.js",
  "description": "Display the green screen, which can be toggled on and off with the 'g' key",
  "author": "ahaoboy",
  "homepage": "https://github.com/ahaoboy/green-screen"
}
```

### run update command

```bash
npm run update:full
```

### udpate cdn

run ci https://github.com/mpv-easy/mpv-easy-cdn/actions/workflows/update.yml on dev branch


### script name

The script file name should be consistent with the script name in meta, in order to avoid problems in some extreme cases. If you encounter problems, please open an issue


## web

https://github.com/mpv-easy/mpv-build

https://mpv-easy.github.io/mpv-build/


## dev

### fish

```fish
set -x MPV_SCRIPT_DIR=/your_mpv_dir/portable_config/scripts ; pnpm run dev
```

### bash

```bash
export MPV_SCRIPT_DIR=/your_mpv_dir/portable_config/scripts && pnpm run dev
```
