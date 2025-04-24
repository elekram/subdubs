import { Context } from '@oak/oak/context'

export function GetSplashHtml(ctx: Context): string {
  const template = `<div class="center-div">
  📺
</div>`

  return ctx.response.body = template
}
