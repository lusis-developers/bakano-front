# front-bakano

The frontend platform where the magic happens

This template should help get you started developing with [Vue 3](https://vuejs.org/) in [Vite](https://vite.dev/) and to styles is used [Bootstrap](https://getbootstrap.com/).

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) 

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
3.
- Create a `.env` file in the root directory and add the necessary environment variables.

*The env variables would be provided you

### Compile and Hot-Reload for Development

4. 
```sh
pnpm dev
```

### Format the code 
5.
```sh
pnpm format
```

### Type-Check, Compile and Minify for Production
6.
```sh
pnpm build
```


### Lint with [ESLint](https://eslint.org/)
7.
```sh
pnpm lint
```

### Run Unit Tests with [Vitest](https://vitest.dev/)
8.
```sh
pnpm test:unit
```