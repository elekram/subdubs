export function GetHome() {
  const dtf = new Intl.DateTimeFormat('en-AU', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Australia/Melbourne',
  }).format(new Date())

  return `<div class="container-fluid">
    <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
        <img
          width="250"
          src="/img/CHELTSEC-LOGO-RGB-COLOUR-POSITIVE.SVG"
          alt="csc-logo" />
      </a>
      <ul class="nav nav-pills">
        <div class="container d-flex h-100">
        <div class="row justify-content-center align-self-center">
          <h2>${dtf}</h2>
        </div>
        </div>
      </ul>
    </header>
  </div>`
}
