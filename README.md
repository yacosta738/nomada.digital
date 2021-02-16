# Yuniel Acosta's Blog and portfolio

[![Netlify Status](https://api.netlify.com/api/v1/badges/349b8978-6ef0-4260-ac99-841444977aca/deploy-status)](https://app.netlify.com/sites/blastkode/deploys)

This is my personal blog based on [Hugo][1] available at <https://www.blastkode.com>

## Pre-requisites:
1. Install Node https://nodejs.org/en/download/ (working version specified in [.nvmrc](./.nvmrc))
2. Install Hugo https://github.com/gohugoio/hugo/releases See expected version in [netlify.toml](./netlify.toml)). Extended version required.

## Running the site
1. `npm run install:prod`
2. `npm start`

## Build (compile) the site to folder _public_
1. `npm run build`

## Tests (headless)
1. `npm install`
2. `npm test`

## Tests (Cypress GUI)
1. `npm install`
2. `npm run test:open`

## Using Docker
For using [Docker][3], you don't need the pre-requisites listed above, but you need Docker 🙄

### Running the site
1. `docker-compose up dev`
or if you have npm installed: `npm run docker:dev`

### Build (compile) the site to folder _public_
1. `docker-compose up build`
or if you have npm installed: `npm run docker:build`

### Tests
1. `docker-compose up test`
or if you have npm installed: `npm run docker:test`

[1]: http://gohugo.io/
[3]: https://docker.io/