document.addEventListener('DOMContentLoaded', async () => {
  const data = await fetchData(`/slideshow-admin`);
  const container = document.getElementById('ajax-container');
  container.innerHTML = data
})



const form = document.getElementById('photoUploadForm');
const element = document.getElementById('formFile');
document.getElementById('submitButton').style.width = '180px';

element.addEventListener("change", updateFileText);

function updateFileText() {
  let fileNames = ""
  let totalSize = 0
  for (const f of element.files) {
    totalSize += f.size
    fileNames += f.name + ', '
  }

  if (totalSize > 25000000) {
    alert('too big')
    return
  }
  document.getElementById('fileLabel').innerHTML = fileNames
}

async function submitForm(form) {
  const formData = new FormData(form);

  try {
    const response = await fetch("/post-add-slideshow", {
      method: "POST",
      body: formData,
    });
    console.log("response.status =", response.status)
    const responseContainer = document.getElementById('response-container');
    responseContainer.innerHTML = await response.text();
  } catch (e) {
    console.error(e);
  }

  document.getElementById('submitButton').disabled = false;
  document.getElementById('submitButton').innerHTML = "Upload CSV Files";
}

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const r = await response.text();
    return new Promise((resolve, reject) => {
      if (r) {
        resolve(r)
      } else {
        reject(new Error('No data received'));
      }
    });
  } catch (error) {
    console.error(error.message);
  }
}
