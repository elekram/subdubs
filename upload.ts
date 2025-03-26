import { format } from '@std/datetime'

export function Upload() {
  const dtf = new Intl.DateTimeFormat('en-AU', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Australia/Melbourne',
  }).format(new Date())

  return `<!doctype html>
<html lang="en" xml:lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="A web application that does school stuff.">
  <title>SubDubs</title>
  <link rel="icon"
    href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📺</text></svg>">
  <link rel="stylesheet" type="text/css" href="/bootstrap-5.3.3-dist/css/bootstrap.min.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
  <script src="/bootstrap-5.3.3-dist/js/bootstrap.bundle.min.js" defer></script>
</head>
<body>
<div class="container-fluid">
  <br>
  <div class="row">
    <div class="col-sm-12 mb-4">
      <div class=" card">
        <div class="card-header">
          <div class="div-left">Google User Cache</div>
        </div>
        <div class="card-body">
  <form id="csvUploadForm" name="csvUploadForm" enctype='multipart/form-data' hx-post="/upload-csvs">
    <div class=" mb-3">
      <label for="formFile" class="form-label">Upload 'Student Allocations Report' (csv)</label>
      <div id="dropZone" class="rounded p-4 text-center mb-3">
        Drag and Drop Files Here<br>OR<br>Click to Select
      </div>
      <!-- <button type="button" class="btn btn-secondary" id="customButton">Choose File</button> -->
      <span id="fileName" class="ms-2">No file(s) selected</span>
    </div>
    <input type="file" id="formFile" name="attachments" class="d-none" multiple />
  </form>
  <button type="button" hx-get="/upload-csvs" class="btn btn-primary" data-bs-toggle="modal"
    data-bs-target="#app-modal">Upload CSV Files
  </button>
        </div>
      </div>
    </div>
  </div>
</div>
</body>
</html>`
}
