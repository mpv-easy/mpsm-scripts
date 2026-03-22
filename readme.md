## @mpv-easy/mpsm-scripts

This repository is responsible for maintaining commonly used js scripts and making them installable via [@mpv-easy/mpsm](https://github.com/mpv-easy/mpv-easy/tree/main/mpv-mpsm). Each script can be used individually or in combination, and will try to avoid functional conflicts caused by multiple scripts.

## MPV Script RFC

https://github.com/mpv-easy/mpv-easy/blob/main/blog/Revolutionizing-mpv-Scripting-A-New-Package-Format-Proposal.md

## MPV Scripts
[MPV Scripts](./scripts-full.md)

## add a new script

### 1. create a script description file

Create a new JSON file in the [scripts](./scripts) folder, using the script name as the filename (e.g. `thumbfast.json`).

The file content should follow this format:

```json
{
  "name": "thumbfast",
  "download": "https://github.com/po5/thumbfast/archive/refs/heads/master.zip",
  "description": "High-performance on-the-fly thumbnailer for mpv.",
  "author": "po5",
  "homepage": "https://github.com/po5/thumbfast"
}
```

The `download` field supports the following link formats:

- **GitHub ZIP**: `https://github.com/{owner}/{repo}/archive/refs/heads/{branch}.zip`
- **GitHub Gist**: `https://gist.github.com/{owner}/{gist_id}`
- **GitHub Release**: `https://github.com/{owner}/{repo}/releases/download/{tag}/{filename}`

> **Note:** The script file name should be consistent with the script name in meta, in order to avoid problems in some extreme cases. If you encounter problems, please open an issue.

### 2. run update command

```bash
npm run update:full
```

This will automatically update all related documentation.

### 3. submit your changes

Commit your changes and submit a PR.

### update cdn

run ci https://github.com/mpv-easy/mpv-easy-cdn/actions/workflows/update.yml on dev branch


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
