import { Context } from '@oak/oak/context'
import { type RouterContext } from '@oak/oak/router'

import sql from '../../db/db.ts'
import postgres from 'postgresjs'

export async function editSlideshow(ctx: RouterContext<string>) {
  const slideshowId = ctx.params.slideshowId
  const s = await getSlideShow(slideshowId)

  if (s instanceof Error) {
    console.log('shit broke')
    return
  }

  const creationdate = new Date(s[0].upload_date)

  const template = `<div class="container-fluid bg-light"></br><div class="row">
          <div class="col-sm-12 mb-4">
            <div class="card">
            <div class="card-body">
            <form id="photoUploadForm" name="photoUploadForm" method="post" enctype='multipart/form-data'>
              <h5 class="card-title">${s[0].slideshow_name}</h5>
              <table class="table">
                <tr>
                  <td><p class="card-text">Slideshow ID</p></td>
                  <td>${s[0].slideshow_id}</td>
                </tr>
                <tr>
                  <td><p class="card-text">Creation Date</p></td>
                  <td>${`${creationdate.toDateString()} ${creationdate.toLocaleTimeString()}`}</td>
                </tr>
              </table>
              <div class=" mb-3">    
              <br>
              <label for="formFile" class="btn btn-secondary ">Choose Photos</label>
              <span id="fileLabel" class="ms-2">No photos selected</span>
              <input type="file" multiple id="formFile" name="attachments" accept="text/jpg" class="d-none" />
            </div>
            </div>
          <div class="card-footer text-body-secondary">
            <button type="submit" id="submitPhotosButton" class="btn btn-warning">Add Photos
            </button>
            <button type="submit" id="" class="btn btn-danger float-end">Delete
            </button>
            <input type="hidden" id="custId" name="custId" value="3487" />
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>`

  return template
}

async function getSlideShow(slideshowId: string) {
  try {
    return await sql`
    SELECT * FROM slideshow_files WHERE slideshow_id=${slideshowId}`
  } catch (e) {
    console.error('Error retrieving slideshow - ', e)
    return new Error('Error retrieving slideshow - ' + e)
  }
}
