export function Admin() {
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
    <script src="/js/admin.js" defer></script>  
  </head>
<body>
  <div class="container-fluid">
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
    </div>
    <div class="row">
      <div class="col-sm-12 mb-4">
        <div id="response-container"></div>
      </div>
  </div>
</body>

</html>`
}
