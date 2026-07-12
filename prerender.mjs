// Post-build step: render the app to static HTML and inject it into the
// built index.html so crawlers (and the first paint) get real content, not
// an empty <div id="root">. The client then hydrates it (see main.tsx).
import { readFileSync, writeFileSync } from 'node:fs'
import { render } from './dist-ssr/entry-server.js'

const INDEX = 'dist/index.html'
const MARKER = '<div id="root"></div>'

const template = readFileSync(INDEX, 'utf8')
if (!template.includes(MARKER)) {
  throw new Error(`Prerender: could not find "${MARKER}" in ${INDEX}`)
}

const appHtml = render()
writeFileSync(INDEX, template.replace(MARKER, `<div id="root">${appHtml}</div>`))
console.log(`Prerendered ${INDEX} (${appHtml.length} chars of app markup)`)
