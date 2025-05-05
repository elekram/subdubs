import { Context } from '@oak/oak/context'
import { getHtmlHead } from '../../html/head.ts'

export function GetSlideShow(ctx: Context) {
  const template = `<!doctype html>
<html lang="en" xml:lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
    ${getHtmlHead('slideshow-admin.js')}
  </head>
<body>
<div class="slider-outer">
  <div class="slider-middle">
    <div class="slider-inner">
      <img id="slider-image" src="/img/slider-test/p2.jpg" alt="...">
    </div>
  </div>
</div> 
</body>
</html>`

  return ctx.response.body = template
}
