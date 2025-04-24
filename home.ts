export function GetSubsNavBar() {
  const dtf = new Intl.DateTimeFormat('en-AU', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Australia/Melbourne',
  }).format(new Date())

  const d = dtf.split('at')[0]
  const t = dtf.split('at')[1]

  return `<div class="container-fluid">
    <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom navbar-override">
      <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
        <img
          width="250"
          src="/img/CHELTSEC-LOGO-RGB-COLOUR-POSITIVE.SVG"
          alt="csc-logo" />
      </a>
      <ul class="nav nav-pills">
        <div class="container d-flex h-100">
        <div class="row justify-content-center align-self-center">
          <h2 class="text-end">${d}</h2>
          <h2 class="text-end">${t}</h2>
        </div>
        </div>
      </ul>
    </header>
  </div>`
}
