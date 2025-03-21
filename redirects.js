const redirects = async () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header',
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  // Add this new redirect for the root path
  const rootToHomeRedirect = {
    source: '/',
    destination: '/home',
    permanent: true,
  }

  const redirects = [internetExplorerRedirect, rootToHomeRedirect]

  return redirects
}

export default redirects
