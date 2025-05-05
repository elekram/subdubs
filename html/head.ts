export function getHtmlHead(appJs: string): string {
  return `<meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="A web application that does school stuff">
  <title>SubDubs</title>
  <link rel="icon"
    href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📺</text></svg>">
  <link rel="stylesheet" type="text/css" href="/bootstrap-5.3.3-dist/css/bootstrap.min.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
  <link rel="stylesheet" type="text/css" href="/css/extend.css" />
  <script src="/bootstrap-5.3.3-dist/js/bootstrap.bundle.min.js" defer></script>
  <script src="/js/${appJs}" defer></script>`
}
