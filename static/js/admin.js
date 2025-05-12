document.addEventListener('DOMContentLoaded', async () => {
  const data = await fetchData(`/admin-v2-navbar`);
  const navContainer = document.getElementById('ajax-navbar');
  navContainer.innerHTML = data
})

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