import { getHtmlHead } from './head.ts'

export function getBaseHtml(): string {
  return `<!doctype html>
  <html lang="en" xml:lang="en" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    ${getHtmlHead()}
  </head>
  <body>
    <div id="ajax-container-1"></div>
    <div id="ajax-container-2"></div>
    <div id="app-error"></div>
  </body>
  </html>`
}
