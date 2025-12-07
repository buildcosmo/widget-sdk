# Marketplace Assets

This directory contains assets that will be displayed on the Cosmo Marketplace listing for your widget.

## Structure

- **`previews/`**: Add screenshots and videos here.
  - Files are sorted **alphabetically/numerically**.
  - The **first image** found will be used as the **Thumbnail** for your widget in the store.
  - Supported formats:
    - Images: `.png`, `.jpg`, `.jpeg`, `.webp`, `.gif` (Optimized to WebP automatically).
    - Videos: `.mp4` (Max 100MB).
  
- **`images/`**: Add images used in your `README.md` documentation here.
  - Example usage in your root Readme: `![Feature Demo](./marketplace/images/demo.png)`
  - These are also optimized and hosted on a global CDN.

> **Note**: Updating these assets requires publishing a new version of your widget.
