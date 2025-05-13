document.addEventListener('DOMContentLoaded', async () => {
  await loadAdminNavbar()
  await addMenuListeners()
  await getSubsAdmin()
})

async function loadAdminNavbar() {
  const data = await fetchData(`/admin-v2-navbar`);
  const navContainer = document.getElementById('ajax-navbar');
  navContainer.innerHTML = data
}

function addMenuListeners() {
  document.getElementById('subdubs-admin').addEventListener('click', async (e) => {
    await getSubsAdmin()
  })

  document.getElementById('run-subs').addEventListener('click', (e) => {
    window.location.href = "/";
  })

  document.getElementById('slideshow-admin').addEventListener('click', async (e) => {
    await getSlideshowadmin()
  })
}

async function getSlideshowadmin() {
  const container1 = document.getElementById('ajax-container-1');
  const container2 = document.getElementById('ajax-container-2');
  container1.innerHTML = ""
  container2.innerHTML = ""
  const data = await fetchData(`/get-slideshow-admin`);
  container1.innerHTML = data
}

async function getSubsAdmin() {
  const container1 = document.getElementById('ajax-container-1');
  const container2 = document.getElementById('ajax-container-2');
  container1.innerHTML = ""
  container2.innerHTML = ""
  const data = await fetchData(`/get-subs-admin`);
  container1.innerHTML = data

  const form = document.getElementById('csvUploadForm');
  const element = document.getElementById('formFile');
  element.addEventListener("change", updateFileText);

  form.addEventListener("submit", (event) => {
    document.getElementById('submitButton').disabled = true;
    document.getElementById('submitButton').innerHTML = "Processing...";
    event.preventDefault();
    submitSubsCsvUploadForm(form);
  });

  document.getElementById('submitButton').style.width = '180px';

  function updateFileText() {
    document.getElementById('fileLabel').innerHTML = element.files[0].name
  }
}

async function submitSubsCsvUploadForm(form) {
  const formData = new FormData(form);

  try {
    const response = await fetch("/post-csv", {
      method: "POST",
      body: formData,
    });
    const responseContainer = document.getElementById('ajax-container-2');
    responseContainer.innerHTML = await response.text();
  } catch (e) {
    console.error(e);
  }

  document.getElementById('submitButton').disabled = false;
  document.getElementById('submitButton').innerHTML = "Upload CSV Files";
  document.getElementById('passwordInput').value = "";
  document.getElementById('formFile').value = "";
  document.getElementById('fileLabel').innerHTML = "";
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