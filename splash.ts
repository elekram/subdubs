// import { format } from '@std/datetime'

export function GetSplash() {
  const dtf = new Intl.DateTimeFormat('en-AU', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Australia/Melbourne',
  }).format(new Date())

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
</head>
<body>
  <div class="container-fluid">
    <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      splash screen
    </header>
  </div>
</body>
</html>`
}
