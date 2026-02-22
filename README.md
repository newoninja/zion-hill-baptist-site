# Zion Hill Baptist Church Website

Static multi-page church website optimized for Netlify hosting.

## Stack

- HTML + CSS + vanilla JavaScript
- Netlify Forms for contact and prayer requests
- Netlify headers/redirects via `netlify.toml`

## Local Development

```bash
python3 -m http.server 8787
```

Open `http://localhost:8787`.

## Deployment

- Connected GitHub repository deploys from `main`
- Publish directory: `.`
- Build command: none

## Page Structure

- `index.html` - Home
- `visit.html` - Plan Your Visit
- `history.html` - Our Story
- `beliefs.html` - Statement of Faith
- `sermons.html` - Audio archive with filtering
- `events.html` - Weekly schedule and upcoming highlights
- `radio.html` - WHKP ministry details
- `pastor.html` - Pastor bio
- `gallery.html` - Photo gallery
- `contact.html` - Contact + prayer forms
- `give.html` - Online giving
- `privacy.html` - Privacy policy

## Weekly Sermon Update Workflow

1. Upload MP3 to `assets/sermons/`.
2. Duplicate a sermon card in `sermons.html`.
3. Update title/date/series and the `audio` source path.
4. Commit and push to `main`.

## Forms

Forms in `contact.html` use Netlify processing and redirect to `thanks.html`.
