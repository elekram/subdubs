import { type RouterContext } from '@oak/oak/router'
import { Router } from 'jsr:@oak/oak/router'
import { GetSubsNavBar } from '../modules/subs/get-subs-navbar.ts '
import { GetSplash } from '../html/get-splash.ts'
import { PostCsv } from '../modules/subs/post-csv.ts'
import { GetData } from '../modules/subs/get-data.ts'
import { getBaseHtml } from '../html/base.ts'
import { getAdminPanel } from '../html/admin-panel.ts'
import { getNavbar } from '../html/admin-navbar.ts'
import { GetSlideShow } from '../modules/slideshow/get-slideshow.ts'
// import { GetSlideshowAdmin } from '../modules/slideshow/get-slideshow-admin.ts'
import { PostSlideshow } from '../modules/slideshow/post-add-slideshow.ts'
import { getSubsAdmin } from '../modules/subs/subs-admin.ts'
import { getSlideshowAdmin } from '../modules/slideshow/slideshow-admin.ts'
import { listSlideshows } from '../modules/slideshow/list-slideshows.ts'
import { editSlideshow } from '../modules/slideshow/edit-slideshow.ts'

const router = new Router()

router
  .get('/', (ctx) => {
    ctx.response.body = getBaseHtml()
  })
  .get('/ping', (ctx) => {
    ctx.response.body = 'pong'
  })
  .get('/v2-admin', (ctx) => {
    ctx.response.body = getAdminPanel()
  })
  .get('/get-subs-navbar', (ctx) => {
    ctx.response.body = GetSubsNavBar()
  })
  // .get('/admin', (ctx) => {
  //   ctx.response.body = Admin()
  // })

  .get('/admin-v2-navbar', async (ctx) => {
    ctx.response.body = await getNavbar()
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
  // .get('/slideshow-admin', async (ctx) => {
  //   await GetSlideshowAdmin(ctx)
  // })
  .get('/edit-slideshow/:slideshowId', async (ctx: RouterContext<string>) => {
    ctx.response.body = await editSlideshow(ctx)
  })
  .get('/get-slideshow', async (ctx) => {
    await GetSlideShow(ctx)
  })
  .get('/get-subs-admin', async (ctx) => {
    ctx.response.body = await getSubsAdmin(ctx)
  })
  .get('/get-slideshow-admin', async (ctx) => {
    ctx.response.body = await getSlideshowAdmin(ctx)
  })
  // .post('/post-slideshow', async (ctx) => {
  //   await PostSlideshow(ctx)
  // })
  .post('/post-add-slideshow', async (ctx) => {
    await PostSlideshow(ctx)
  })
  .get('/list-slideshows', async (ctx) => {
    ctx.response.body = await listSlideshows(ctx)
  })
  .get('/(.*)', (ctx) => {
    ctx.response.body = ctx.response.body = getBaseHtml()
  })

export default router
