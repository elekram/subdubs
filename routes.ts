import { Router } from 'jsr:@oak/oak/router'
import { GetHome } from './home.ts'
import { GetSplash } from './splash.ts'
import { Admin } from './admin.ts'
import { PostCsv } from './post-csv.ts'
import { getBaseHtml } from './html/base.ts'
const router = new Router()

router
  .get('/', (ctx) => {
    ctx.response.body = getBaseHtml()
  })
  .get('/ping', (ctx) => {
    ctx.response.body = 'pong'
  })
  .get('/home', (ctx) => {
    ctx.response.body = GetHome()
  })
  .get('/admin', (ctx) => {
    ctx.response.body = Admin()
  })
  .post('/post-csv', async (ctx) => {
    await PostCsv(ctx)
  })
  .get('/(.*)', (ctx) => {
    ctx.response.body = getBaseHtml()
  })

export default router
