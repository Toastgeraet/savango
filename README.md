# Deployment to GitHub Pages

## Switch to local deploy branch

Optionally create branch.
```bash
git checkout -b dist
```

Or just merge main branch
```bash
git checkout dist
git merge main
```

## Build (Git Bash)
`--base` is used for repo name
```bash
MSYS_NO_PATHCONV=1 ./node_modules/vite/bin/vite.js build --base='/savango/'
```

## Commit
```bash
git add -f dist && git commit -m 'adding dist subtree'
```

## Deploy
```bash
git subtree push --prefix dist origin gh-pages
```


# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.
