# office

Plays videos on a loop for a screen in an office lobby (currently the Weybridge reception).

## Senza app URL

Configure the Senza device against:

```
https://synamedia-senza.github.io/office/
```

This is what the device on the Weybridge reception TV (tenant `tcd36iji`, device `7e6dd8050d21af04`) points at.

## Deployment

The site is served by GitHub Pages. **Any commit to `main` triggers an automatic deploy** via [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml) — typically live within a minute. No manual build or upload step.

## Videos

The HTML/JS lives in this repo; the videos themselves are hosted separately on S3 / CloudFront at `https://vod.infiniteplatform.tv/weybridge/videos_reception/`. The set of clips played is the `videosLinks` array in [office.js](office.js) — add or remove entries there and merge to `main` to update the loop.
