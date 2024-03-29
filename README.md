# spiderspace: blocks

> safe+serializable layout+content blocks with
> [Svelte](https://github.com/sveltejs/svelte)

> **work in progress**: experimental

| [🕸️](https://spiderspace.github.io/blocks)                               | [🐙🐱](https://github.com/spiderspace)                        | 🧪                                                                          |
| ------------------------------------------------------------------------ | ------------------------------------------------------------- | --------------------------------------------------------------------------- |
| [**spiderspace.github.io/blocks**](https://spiderspace.github.io/blocks) | **spiderspace/blocks**                                        | Svelte; safe&serializable layout&content blocks                             |
| [spiderspace.github.io/about](https://spiderspace.github.io/about)       | [spiderspace/about](https://github.com/spiderspace/about)     | Svelte+[iconify](https://github.com/iconify); spiderspace is web prototypes |
| [spiderspace.github.io/mutable](https://spiderspace.github.io/mutable)   | [spiderspace/mutable](https://github.com/spiderspace/mutable) | Svelte; mutable store values w/ `immutable` on                              |

## goals

- introduce and explain Spiderspace
- deploy Spiderspace and its repos to static GitHub Pages websites so it's fork-friendly
- in this repo, create patterns, components, and helpers around
  a serializable block data structure that renders as Svelte components for layout and content,
  that works well with a structured editor, and that can be safely used from untrusted sources

## motivation

Spiderspace is a bunch of prototypes using a particular web software toolkit:
Svelte, SvelteKit, [and more](#credits-). See the table above for the currently active repos.

If you find yourself intrigued by any particular prototype, visit the
[discussions here on spiderspace/blocks](https://github.com/spiderspace/blocks/discussions)
and the issues in [the appropriate repos](https://github.com/spiderspace).
You're also invited to propose more prototypes!

Spiderspace does not publish to any package registries.
The projects here are meant to be extracted and published to registries by anyone who wishes,
which could include you!
The source code is all public domain so you may use it however you wish.
(and also, note that any contributions you make will be licensed the same)

This repo's prototype explores data-driven rich text authoring and UI creation
using the same data structure and rendering patterns.
The goal is to support users authoring and sharing untrusted rich content
and dynamic end-user-programmable UI in a structured editing WYSIWYG-like environment.
Share your thoughts
[in the GitHub discussions](https://github.com/spiderspace/blocks/discussions)!

## design

The goal of this prototype is to create patterns, components, and helpers around
a serializable block data structure that renders as Svelte components for layout and content.

- create layouts, spaces, and documents with a serializable JSON data structure
  that's safe to share with strangers
  - currently simpler than Svelte AST, though this is going to change to use
    [SVAST](https://github.com/pngwn/MDsveX/tree/master/packages/svast)
  - safe to share (e.g. sanitized style attributes and allowlisted domains when loading any URLs)
  - support both text input as well as structured editing
    (so the canonical representation is likely a JSON AST)
  - should it include dynamic data loading, like what JSON-LD provides with Activity Streams?
  - is `Block` the preferred word?

## innards

> very much a _work in progress_

- 📁 **[src](/src)**
  - 📁 **[lib](/src/lib)** — SvelteKit [$lib directory](https://kit.svelte.dev/docs#modules-$lib)
    - 📁 **[app](/src/lib/app)** — modules and data specific to this app, not expected to be portable or exported
      - 🔷 **[blocks.ts](/src/lib/app/blocks.ts)** — block data for the current layouts
    - 📁 **[ui](/src/lib/ui)** — generic reusable frontend things that may be upstreamed to other libraries
      - 🔷 **[block.ts](/src/lib/ui/block.ts)** — block types
      - 🔷 **[block.test.ts](/src/lib/ui/block.test.ts)** — block sanitization tests
      - 🔶 **[BlockView.svelte](/src/lib/ui/BlockView.svelte)** — render block data
  - 📁 **[routes](/src/routes)** — [SvelteKit frontend](https://kit.svelte.dev/docs#routing)

## todo

- use zod to parse for sanitization
- use codemirror6
- center on [SVAST](https://github.com/pngwn/MDsveX/tree/master/packages/svast)
  instead of the current simplified `Block`
- dynamic remote async data loading? at odds with SVAST? (e.g. following Activity Streams URLs)
- component children/slots? (really creeping into AST territory...)
- implement `Fragment`
- more direct manipulation
- views
  - 2d block view (add optional `x`/`y` properties or maybe `location.x/y`)
- authoring
  - include an "add block" button in devmode
  - delete blocks
  - edit blocks
  - sort/dragndrop blocks
  - generic collection actions
- parse per-component props, per-element attributes, and per-event params
- security
  - allowlist domains for `src` and `href`
  - somehow put governing handles on events
- async data resolution (JSON URIs for sharing/persistance)
- make all blocks responsive
- let the iframes request their layout dimensions
- hot swap block branches?
- sync `Iframe` header with navigation inside the iframe?

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
[esbuild](https://github.com/evanw/esbuild) ∙
[uvu](https://github.com/lukeed/uvu) ∙
[TypeScript](https://github.com/microsoft/TypeScript) ∙
[Gro](https://github.com/feltcoop/gro) ∙
[Felt](https://github.com/feltcoop/felt) ∙
[Prettier](https://github.com/prettier/prettier)
& [more](package.json)

## license [🐦](https://wikipedia.org/wiki/Free_and_open-source_software)

public domain ⚘ [The Unlicense](license)
