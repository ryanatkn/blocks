# spiderspace

> spiderspace is web prototypes

> **work in progress**

| [🕸️](https://www.spiderspace.org)                                        | [🐙🐱](https://github.com/spiderspace)                          |
| ------------------------------------------------------------------------ | --------------------------------------------------------------- |
| [www.spiderspace.org](https://www.spiderspace.org)                       | spiderspace/spiderspace                                         |
| [spiderspace.github.io/about](https://spiderspace.github.io/about)       | [spiderspace/about](https://github.com/spiderspace/about)       |
| [spiderspace.github.io/css-vars](https://spiderspace.github.io/css-vars) | [spiderspace/css-vars](https://github.com/spiderspace/css-vars) |

## design

- create layouts, spaces, and documents with a serializable JSON data structure
  - simpler than Svelte AST (though this may change)
  - safe to share (e.g. sanitized style attributes)
    (currently insecure by splatting attributes on DOM elements, relies on
    [CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy)
    to block external network connections,
    and maybe we'll want to stick with this and add trusted domains as a UX affordance)
  - ultimately should this be a mdsvex+Svelte AST?

## innards

> very much a _work in progress_

- 📁 **[src](/src)**
  - 📁 **[lib](/src/lib)** — SvelteKit [$lib directory](https://kit.svelte.dev/docs#modules-$lib)
    - 📁 **[app](/src/lib/app)** — modules and data specific to this app, not expected to be portable or exported
      - 🔷 **[blocks.ts](/src/lib/app/blocks.ts)** — block data for the current layouts
    - 📁 **[ui](/src/lib/ui)** — generic reusable frontend things that may be upstreamed to other libraries
      - 🔷 **[block.ts](/src/lib/ui/block.ts)** — block types
      - 🔶 **[BlockView.svelte](/src/lib/ui/BlockView.svelte)** — render block data
  - 📁 **[routes](/src/routes)** — [SvelteKit frontend](https://kit.svelte.dev/docs#routing)

## todo

- block rendering security
  - sanitize element attributes?
  - currently uses a CSP. maybe keep it, and allowlist domains?
- each iframe on the page eats at least one press of the back button, not good!
- sync `Iframe` header with navigation inside the iframe
- sort/dragndrop blocks
- 2d block view (add optional `x`/`y` properties or maybe `location.x/y`)
- make all blocks responsive
- let the iframes request their layout dimensions

## usage

```bash
# node >= 16.6
npm i
npm run dev
# or
gro dev # npm i -g @feltcoop/gro
```

## build

```bash
npm run build
# or
gro build
```

## deploy

```bash
npm run deploy
# or
gro deploy
```

## credits 🐢<sub>🐢</sub><sub><sub>🐢</sub></sub>

[Svelte](https://github.com/sveltejs/svelte) ∙
[SvelteKit](https://github.com/sveltejs/kit) ∙
[Vite](https://github.com/vitejs/vite) ∙
[Gro](https://github.com/feltcoop/gro) ∙
[Felt](https://github.com/feltcoop/felt) ∙
[Rollup](https://github.com/rollup/rollup) ∙
[TypeScript](https://github.com/microsoft/TypeScript) ∙
[esbuild](https://github.com/evanw/esbuild) ∙
[Prettier](https://github.com/prettier/prettier) ∙
[@lukeed\/\*](https://github.com/lukeed)
& [more](package.json)

## license [🐦](https://wikipedia.org/wiki/Free_and_open-source_software)

public domain ⚘ [The Unlicense](license)
