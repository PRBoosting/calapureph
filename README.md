# CalaPure Website

A responsive CalaPure online storefront built with Next.js and prepared for GitHub and Netlify.

## Features

- Responsive desktop and mobile design
- CalaPure product gallery and pricing
- Shopping cart and SMS order flow
- DTI, BIR, and FDA information supplied by CalaPure
- GCash, Maya, bank transfer, and cash-on-delivery payment information
- Lazada checkout link

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
5. Use `npm run build` as the build command and leave the publish directory blank.
6. Deploy the site.

The included `netlify.toml` selects Node.js 22 and the correct build command.
