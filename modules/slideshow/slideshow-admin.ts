import { Context } from '@oak/oak/context'

export function getSlideshowAdmin(ctx: Context): string {
  return `    <div class="container-fluid">
      <br>
      <div class="row">
        <div class="col-sm-12 mb-4">
          <div class=" card">
            <div class="card-header">
              <div class="div-left">Slideshow Creator</div>
            </div>
            <div class="card-body">
            <form id="photoUploadForm" name="photoUploadForm" method="post" enctype='multipart/form-data'>
            <div>Add Slideshow</div>
            <div></br></div>
            <table class="table table-default">
              <tr>
                <td class="ctl-width">
                  <label for="keyInput">🔐 Key</label>
                </td>
                <td>
                  <input id="keyInput" name="keyInput" type="password">
                </td>
              </tr>
              <tr>
                <td class="ctl-width">
                  <label for="slideshowName">🖼️ Slideshow Name</label>
                </td>
                <td>
                  <input id="slideshowName" name="slideshowName" type="text">
                </td>
              </tr>
            </table>    
                <div class=" mb-3">    
                  <br>
                  
                </div>
              <button type="submit" id="submitButton" class="btn btn-primary float-end">Create Slideshow
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
    </div>`
}
