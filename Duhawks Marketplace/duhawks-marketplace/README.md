# Duhawks Marketplace — Campus Life Super App MVP

A three-page mobile-first marketplace prototype for Loras College students, based on the Home, Search, and Working Table wireframes.

## Run
Open `index.html` in a browser (internet access is needed for Bootstrap CDN and the optional demo API). For best results use VS Code Live Server.

## Pages
- `index.html`: home banner, Browse by Space, featured listings
- `search.html`: search form, suggested searches, browse by category
- `category.html`: results, price sorting/filter, save and add-to-cart actions

## Features and limitations
- Search and filtering operate on local **sample data**.
- Saved items and cart persist in the same browser using localStorage; checkout and account verification are **not** implemented.
- JavaScript includes a `fetch()` call to JSONPlaceholder as a proof-of-setup API integration. This endpoint is **not** a marketplace API and its data is not used for listings.
- Profile, real student authentication, payments, product uploads, messaging, and a backend are future features.
- Bootstrap is loaded from a CDN; custom styles are in `assets/css/styles.css`.

## Git: make at least three commits
Run these in a terminal after extracting the ZIP, from the `duhawks-marketplace` folder. To reflect genuine progress, create commits while developing or revising the project; don't claim commits that you haven't made.

```bash
git init
git add index.html search.html category.html
git commit -m "Create three marketplace pages and navigation"
git add assets/css/styles.css
git commit -m "Add Bootstrap layout and custom marketplace styling"
git add assets/js/app.js README.md
git commit -m "Implement search cart events and demo API setup"
```

To publish, create a GitHub repository, add its remote URL, and push your branch. Git commits have **not** been created by this ZIP.
