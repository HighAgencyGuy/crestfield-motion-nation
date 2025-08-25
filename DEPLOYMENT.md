# Deployment Guide for Crestfield Website

## Image Handling

### Problem
The hero section background images were not loading on Vercel deployment because they were referenced with `/src/assets/` paths, which work in development but not in production builds.

### Solution
1. **Images moved to public folder**: All hero images are now stored in the `public/` folder
2. **Utility functions**: Created `src/lib/images.ts` for consistent image path management
3. **Updated references**: All pages now use the utility functions for image paths

### Image Structure
```
public/
├── hero-about.jpg
├── hero-contact.jpg
├── hero-locator.jpg
├── hero-services.jpg
├── hero-petroleum.jpg
└── favicon.ico
```

### Usage
```typescript
import { heroAbout, heroContact, heroLocator, heroServices } from "@/lib/images";

// In JSX
style={{backgroundImage: `url(${heroAbout})`}}
```

## Deployment Steps

1. **Build locally**: `npm run build`
2. **Verify images**: Check that images are in `dist/` folder
3. **Push to GitHub**: All changes committed and pushed
4. **Vercel deployment**: Automatic deployment from GitHub

## Why This Fixes the Issue

- **Development**: Images served from `public/` folder
- **Production**: Images served from root path `/` in Vercel
- **Consistent paths**: Utility functions ensure same behavior in both environments
- **Build process**: Vite copies public folder contents to dist folder

## Maintenance

- Add new images to `public/` folder
- Update `src/lib/images.ts` with new image paths
- Use utility functions in components
- Test both development and production builds 