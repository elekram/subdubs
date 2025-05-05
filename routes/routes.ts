import { Router } from 'jsr:@oak/oak/router'
import { GetSubsNavBar } from '../modules/subs/get-subs-navbar.ts '
import { GetSplash } from '../html/get-splash.ts'
import { Admin } from '../modules/subs/admin.ts'
import { PostCsv } from '../modules/subs/post-csv.ts'
import { GetData } from '../modules/subs/get-data.ts'
import { getBaseHtml } from '../html/base.ts'
import { GetSlideShow } from '../modules/slideshow/get-slideshow.ts'
const router = new Router()

router
  .get('/', (ctx) => {
    ctx.response.body = getBaseHtml()
  })
  .get('/ping', (ctx) => {
    ctx.response.body = 'pong'
  })
  .get('/get-subs-navbar', (ctx) => {
    ctx.response.body = GetSubsNavBar()
  })
  .get('/admin', (ctx) => {
    ctx.response.body = Admin()
  })
  .post('/post-csv', async (ctx) => {
    await PostCsv(ctx)
  })
  .get('/get-data', async (ctx) => {
    await GetData(ctx)
  })
  .get('/get-splash', async (ctx) => {
    await GetSplash(ctx)
  })
  .get('/get-slideshow', async (ctx) => {
    await GetSlideShow(ctx)
  })
  .get('/(.*)', (ctx) => {
    ctx.response.body = getBaseHtml()
  })

export default router
