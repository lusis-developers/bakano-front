# front-bakano

The frontend platform where the magic happens

This template should help get you started developing with Vue 3 in Vite and to styles is used [Bootstrap](https://getbootstrap.com/).

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

[Cursor](https://www.cursor.com/)

## Prerequisites

- Node.js (v18 or later)
- pnpm 
- ENV variables (will be provided)


## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

### Getting Started

1. Clone te repository
```
git clone git@github.com:lusis-developers/bakano-front.git
```

## Project Setup

2. Install dependencies
```sh
pnpm install
```

### Setup the env variables
- Create a `.env` file in the root directory and add the necessary environment variables.

*The env variables would be provided you

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Format the code 
```sh
pnpm format
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```


### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```