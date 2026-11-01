#!/usr/bin/env node
/**
 * Make quartz.lock.json portable for local (vendored) plugins.
 *
 * Local plugin entries store an absolute `resolved` path, which breaks on any
 * other machine (e.g. the Vercel build container). This script re-resolves every
 * local entry against the current repository root before `npx quartz plugin
 * install` runs, so the symlink target is always correct.
 */
import fs from "node:fs"
import path from "node:path"

const root = process.cwd()
const lockPath = path.join(root, "quartz.lock.json")

if (!fs.existsSync(lockPath)) {
  console.log("sync-local-plugins: no quartz.lock.json found, nothing to do")
  process.exit(0)
}

const lock = JSON.parse(fs.readFileSync(lockPath, "utf-8"))
let fixed = 0
for (const [name, entry] of Object.entries(lock.plugins ?? {})) {
  if (entry.commit === "local" && typeof entry.source === "string") {
    const resolved = path.resolve(root, entry.source)
    if (entry.resolved !== resolved) {
      entry.resolved = resolved
      fixed++
    }
  }
}

if (fixed > 0) {
  fs.writeFileSync(lockPath, JSON.stringify(lock, null, 2) + "\n")
  console.log(`sync-local-plugins: re-resolved ${fixed} local plugin path(s)`)
} else {
  console.log("sync-local-plugins: local plugin paths already correct")
}
