# Zion Hill Baptist Church Website

Static multi-page website for Zion Hill Baptist Church.

## Local Development

Run a local server from the project root:

```bash
python3 -m http.server 8787
```

Open:

- `http://localhost:8787`

## Netlify Deployment

This project is configured for Netlify with `netlify.toml`.

- Publish directory: `.`
- Build command: _(none)_

### Deploy via GitHub

1. Create a new GitHub repository.
2. Push this project to `main`.
3. In Netlify, choose **Add new site** -> **Import an existing project**.
4. Select your GitHub repo.
5. Keep build settings as configured by `netlify.toml` and deploy.

### Optional: Deploy via Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

## Content Updates

- Sermons: add MP3 files to `assets/sermons/`.
- Images: replace files in `assets/images/`.
- Pages: edit the `.html` files directly.
