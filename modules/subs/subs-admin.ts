import { Context } from '@oak/oak/context'

export function getSubsAdmin(ctx: Context): string {
  return `<div class="container-fluid">
  <br>
  <div class="row">
    <div class="col-sm-12 mb-4">
      <div class=" card">
        <div class="card-header">
          <div class="div-left">Data Uploader</div>
        </div>
        <div class="card-body">
        <form id="csvUploadForm" name="csvUploadForm" method="post" enctype='multipart/form-data'>
        <label for="formFile" class="form-label">Upload 'Teacher Replacements Report' (csv)</label>
        <div></br></div>
          <label for="passwordInput">🔐 Upload Key</label>
          <input id="passwordInput" name="passwordInput" type="password">
          
            <div class=" mb-3">    
              <br>
              <label for="formFile" class="btn btn-secondary ">Choose File</label>
              <span id="fileLabel" class="ms-2">No file(s) selected</span>
              <input type="file" id="formFile" name="attachments" accept="text/csv" class="d-none" />
            </div>
            <button type="submit" id="submitButton" class="btn btn-primary float-end">Upload CSV Files
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>`
}
