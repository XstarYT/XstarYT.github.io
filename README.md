# Curioverse on GitHub Pages

This folder is the complete static website. It needs no build step, Node installation, or server code.

1. Create a GitHub repository, or open the repository you want to use.
2. Upload **the contents of this folder** to the repository root. Keep `index.html`, `quantum.html`, `quantum.css`, `quantum.js`, and `.nojekyll` together at that top level. GitHub's web upload may hide `.nojekyll`; if so, create an empty file with that exact name in the repository root.
3. In the repository, open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/(root)`, then save.
4. Open the URL GitHub shows under **Settings → Pages**. The gallery tile should lead to `quantum.html`, and the exhibit's back links should return to `index.html`.

The page links are relative, so this works both at a personal site such as `https://username.github.io/` and at a project site such as `https://username.github.io/repository/`.

GitHub Pages instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

