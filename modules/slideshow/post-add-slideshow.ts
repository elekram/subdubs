import { Context } from '@oak/oak/context'
import * as uuid from 'jsr:@std/uuid'
import sql from '../../db/db.ts'
import cfg from '../../config/config.ts'

export async function PostSlideshow(ctx: Context) {
  if (!ctx.request.hasBody) {
    console.error('no form body')
  }

  const newUUID = uuid.v1.generate()
  const reqBody = await ctx.request.body.formData()
  const slideshowName = reqBody.get('slideshowName') as string
  const keyInput = reqBody.get('keyInput') as string

  if (keyInput !== cfg.uploadKey) {
    return ctx.response.body = getErrorBody('Invalid Upload Key')
  }

  if (!slideshowName || slideshowName === '') {
    return ctx.response.body = getErrorBody('Slideshow name is required.')
  }

  const res = await addSlideshow(
    slideshowName,
    newUUID,
  )

  if (res instanceof Error) {
    return ctx.response.body = getErrorBody(res.message)
  }

  return ctx.response.body = 'File uploaded successfully'
}

async function addSlideshow(
  slideShowName: string,
  uuid: string,
) {
  try {
    return await sql`
    insert into slideshow_files
      (slideshow_id, slideshow_name)
    values
      (${uuid}, ${slideShowName})
    RETURNING slideshow_id, slideshow_name
  `
  } catch (e) {
    console.error('Error creating slideshow - ', e)
    return new Error('Error creating slideshow - ' + e)
  }
}

function getErrorBody(error: string) {
  return `<div class="alert alert-danger" role="alert">
  <h4 class="alert-heading">Create Slideshow Failed</h4>
  <p>${error}.</p>
  <p>If unsure, contact your systems administrator.</p>
</div>`
}
