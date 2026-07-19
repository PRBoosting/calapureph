# CalaPure Website

A responsive CalaPure online storefront built with Next.js and prepared for GitHub and Netlify.

## Features

- Responsive desktop and mobile design
- Blended CalaPure product hero presentation
- CalaPure product gallery and pricing
- Shopping cart and SMS order flow
- Compact DTI, BIR, and FDA credential strip using client-supplied status information
- Updated "Why Choose CalaPure" benefits section
- GCash, Maya, bank transfer, and cash-on-delivery payment information
- Lazada checkout link
- Streamlined responsive footer

## Run locally

```powershell
npm.cmd install
npm.cmd run dev
```

Open `http://localhost:3000` in your browser.

## Check the production build

```powershell
npm.cmd run build
```

## Deploy through Netlify

1. Create a new GitHub repository.
2. Upload the contents of this folder to the repository root.
3. In Netlify, select **Add new project → Import an existing project**.
4. Select the GitHub repository.
5. Use `npm run build` as the build command and `out` as the publish directory.
6. Deploy the site.

The included `netlify.toml` selects Node.js 22, runs the production build, and publishes the generated `out` folder.
