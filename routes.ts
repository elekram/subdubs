import { Router } from 'jsr:@oak/oak/router'
import { GetSubsNavBar } from './home.ts'
import { GetSplashHtml } from './html/splash.ts'
import { Admin } from './admin.ts'
import { PostCsv } from './post-csv.ts'
import { GetData } from './get-data.ts'
import { getBaseHtml } from './html/base.ts'
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
    await GetSplashHtml(ctx)
  })
  .get('/(.*)', (ctx) => {
    ctx.response.body = getBaseHtml()
  })

export default router
