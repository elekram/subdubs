import { Context } from '@oak/oak/context'
import { getHtmlHead } from '../../html/head.ts'

export function GetSlideshowAdmin(ctx: Context) {
  const template = `<!doctype html>
<html lang="en" xml:lang="en" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    ${getHtmlHead('slideshow-adm.js')}
  </head>
  <body>
    <div class="container-fluid">
      <br>
      <div class="row">
        <div class="col-sm-12 mb-4">
          <div class=" card">
            <div class="card-header">
              <div class="div-left">Photo Uploader</div>
            </div>
            <div class="card-body">
            <form id="photoUploadForm" name="photoUploadForm" method="post" enctype='multipart/form-data'>
            <label for="formFile" class="form-label">Photo Uploader</label>
            <div></br></div>
              <label for="passwordInput">🔐 Upload Key</label>
              <input id="passwordInput" name="passwordInput" type="password">
              
                <div class=" mb-3">    
                  <br>
                  <label for="formFile" class="btn btn-secondary ">Choose Files</label>
                  <span id="fileLabel" class="ms-2">No file(s) selected</span>
                  <input type="file" multiple id="formFile" name="attachments" accept="text/jpg" class="d-none" />
                </div>
              <button type="submit" id="submitButton" class="btn btn-primary float-end">Upload Photos
              </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 mb-4">
          <div id="response-container"></div>
        </div>
    </div>
  </body>
</html>`

  return ctx.response.body = template
}
