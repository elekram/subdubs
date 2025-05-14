import { Context } from '@oak/oak/context'
import sql from '../../db/db.ts'
import postgres from 'postgresjs'

export async function listSlideshows(ctx: Context) {
  const slideshows = await getSlideshows()
  console.log(slideshows)

  if (slideshows instanceof Error) {
    console.log('shit broke')
    return
  }

  if (!slideshows.length) {
    return `<div class="container-fluid"></br><div class="alert alert-secondary text-center" role="alert"><h2>No slideshows created yet</h2></div></div>`
  }

  let template =
    `<div class="container-fluid"><div class="card"><div class="card-header text-bg-secondary">
  <div class="div-left">Slideshows</div>
</div>`

  for (const s of slideshows as postgres.Row[]) {
    template += `<div class="container-fluid bg-light"></br><div class="row">
    <div class="col-sm-12 mb-4">
      <div class="card">
      <div class="card-body">
        <h5 class="card-title">${s.slideshow_name}</h5>
        <p class="card-text">Device ID: ${s.slideshow_id}</p>
        Creation Date: ${s.upload_date}
      </div>
    <div class="card-footer text-body-secondary">
    <button type="submit" id="submitButton" class="btn btn-warning">Edit
        </button>&nbsp;&nbsp;
        <button type="submit" id="" class="btn btn-danger">Delete
        </button>
    </div>
    </div>
    </div>
  </div></div>`
  }

  template += `</div></div></br>`
  return template
}

async function getSlideshows() {
  try {
    return await sql`
    SELECT DISTINCT slideshow_id, slideshow_name, upload_date 
    FROM slideshow_files 
    ORDER BY upload_date DESC`
  } catch (e) {
    console.error('Error creating slideshow - ', e)
    return new Error('Error creating slideshow - ' + e)
  }
}
