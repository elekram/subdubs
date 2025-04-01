import { Router } from 'jsr:@oak/oak/router'
import { GetHome } from './home.ts'
import { GetSplash } from './splash.ts'
import { Admin } from './admin.ts'
import { UploadCsv } from './upload-csv.ts'
const router = new Router()

router
  .get('/', (ctx) => {
    ctx.response.body = GetSplash()
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
  .post('/upload-csv', async (ctx) => {
    await UploadCsv(ctx)
  })

export default router
