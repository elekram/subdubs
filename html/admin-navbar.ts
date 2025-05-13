export function getNavbar(): string {
  return `<nav class="navbar bg-dark navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">📺 subdubs</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active navbar-cursor" id="subdubs-admin" aria-current="page">Subs</a>
        </li>
        <li class="nav-item">
          <a class="nav-link navbar-cursor" id="slideshow-admin">Slideshow</a>
        </li>
      </ul>
      <form class="d-flex" role="search">
        <button id="run-subs" class="btn btn-outline-success" type="button">Subs</button>
      </form>
    </div>
  </div>
</nav>`
}
