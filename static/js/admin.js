
const form = document.getElementById('csvUploadForm');
const element = document.getElementById('formFile');

element.addEventListener("change", updateFileText);

function updateFileText() {
  document.getElementById('fileLabel').innerHTML = element.files[0].name
}

async function submitForm(form) {
  const formData = new FormData(form);

  try {
    const response = await fetch("/post-csv", {
      method: "POST",
      body: formData,
    });
    console.log("response.status =", response.status)
    const responseContainer = document.getElementById('response-container');
    responseContainer.innerHTML = await response.text();
  } catch (e) {
    console.error(e);
  }

}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  submitForm(form);
});
