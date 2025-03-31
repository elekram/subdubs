import { Router } from 'jsr:@oak/oak/router'
import { GetHome } from './home.ts'
import { GetSplash } from './splash.ts'
import { Admin } from './admin.ts'
// import { UploadCsv } from './upload-csv.ts'
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
    if (!ctx.request.hasBody) {
      console.log('no body cuz')
    }

    const reqBody = await ctx.request.body.formData()
    for (const pair of reqBody.entries()) {
      const field = pair[0], val = pair[1]
      if (val instanceof File) {
        console.log('FILE =>', field, val)
        const f = val.name
        const destPath = `${Deno.cwd()}/uploads/${f}`
        const data = await val.arrayBuffer()
        console.log(data)
        await Deno.writeFile(`${destPath}`, await new Uint8Array(data))
      } else {
        console.log('FIELD:', field, val)
      }
    }

    ctx.response.body = 'submitted'
  })

export default router
