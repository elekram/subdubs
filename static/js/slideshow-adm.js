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
    const response = await fetch("/post-slideshow", {
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

form.addEventListener("submit", (event) => {
  document.getElementById('submitButton').disabled = true;
  document.getElementById('submitButton').innerHTML = "Processing...";
  event.preventDefault();
  submitForm(form);
}); 
