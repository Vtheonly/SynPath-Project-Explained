# SynPath-Project-Explained

**SynPath: 3D-SynTree Dual Knowledge Base** — the complete, interconnected documentation site for [3D-SynTree](https://github.com/Vtheonly/SynPath-Project-Explained), a structure-based, synthesis-constrained molecular design system.

The site is a dual-curriculum digital garden:

- **`content/Chemistry/`** — Scientific & Chemical Foundations Vault: 11 modules (00–10), 58 concept notes covering atoms, reaction grammar, protein pockets, stereochemistry, thermodynamics, circular statistics, and wet-lab translation.
- **`content/AI/`** — AI, Mathematics & Systems Engineering Vault: 11 modules (00–10), 73 notes covering tensor algebra, Lie groups, PaiNN, torsion heads, GFlowNets, training dynamics, and GPU numerics.

Every note follows a strict 9-section schema, ends with a Mermaid mind map, and is connected to the mirrored vault through **Cross-Domain Links** — bidirectional wikilinks tying each AI method to the chemical reality it implements. Start at [`content/index.md`](content/index.md).

## Quickstart (local)

```bash
npm install
npm run serve      # installs plugins, builds, and serves at http://localhost:8080
```

or, for a one-off production build:

```bash
npm run build      # output lands in public/
```

Requirements: Node >= 22, npm >= 10.9.2 (see `.node-version`).

## Deploying on Vercel

1. Push this repository to GitHub.
2. On [vercel.com](https://vercel.com): **Add New → Project → Import** this repository.
3. Click **Deploy** — no manual configuration needed. [`vercel.json`](vercel.json) already defines:

   | Setting | Value |
   | --- | --- |
   | Framework | Other (`null`) |
   | Install command | `npm install` |
   | Build command | `npm run build` |
   | Output directory | `public` |
   | Clean URLs | enabled |

> **Why `npm run build` instead of `npx quartz build`?**
> `npm run build` triggers the `prebuild` hook, which first re-resolves the local
> plugin path (`scripts/sync-local-plugins.mjs`) and then installs all Quartz
> plugins pinned in `quartz.lock.json` (including the vendored footer plugin) via
> `npx quartz plugin install`. A bare `npx quartz build` would skip plugin
> installation and fail on a fresh clone.

The default deployment URL is `synpath-project-explained.vercel.app`; if you rename the Vercel project or attach a custom domain, update `baseUrl` in `quartz.config.yaml`.

## Repository layout

```text
content/                 Markdown source (the two vaults + landing page)
quartz/                  Quartz v5 site generator (MIT, see LICENSE.txt)
quartz.config.yaml       Site configuration: branding, plugins, layout
quartz.lock.json         Pinned plugin revisions (incl. local plugin path)
plugins/footer/          Vendored footer plugin (SynPath-Project-Explained
                         attribution instead of the default template credit)
scripts/sync-local-plugins.mjs  Makes the local plugin path portable across machines
vercel.json              Zero-config Vercel deployment settings
```

## Customizing

- **Site title, colors, fonts, base URL:** `quartz.config.yaml` (`configuration` section).
- **Plugins (Explorer, Search, Graph, Backlinks, Table of Contents, LaTeX/KaTeX, Mermaid, ...):** enable/disable and reorder in `quartz.config.yaml` (`plugins` section).
- **Footer:** edit `plugins/footer/src/components/Footer.tsx`, then rebuild.
- **Content:** everything under `content/` is plain Markdown with Obsidian-style `[[wikilinks]]`; link resolution is `shortest`, so `[[exact note name]]` works from anywhere.

## Credits & license

- Site generator: [Quartz v5](https://quartz.jzhao.xyz) by Jacky Zhao and the Quartz community — MIT licensed; see [`LICENSE.txt`](LICENSE.txt). Plugins are installed from the [`quartz-community`](https://github.com/quartz-community) plugin registry with revisions pinned in `quartz.lock.json`.
- The vendored footer plugin in `plugins/footer/` is adapted from `quartz-community/footer` (MIT).
- Content: SynPath / 3D-SynTree knowledge base, maintained by [vtheonly](https://github.com/Vtheonly).
