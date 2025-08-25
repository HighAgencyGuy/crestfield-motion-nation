// Image path utility for consistent image loading across environments
export const getImagePath = (imageName: string): string => {
  // In production, images are served from the root
  // In development, they can be served from public folder
  return `/${imageName}`;
};

// Hero image paths
export const heroImages = {
  about: getImagePath('hero-about.jpg'),
  contact: getImagePath('hero-contact.jpg'),
  locator: getImagePath('hero-locator.jpg'),
  services: getImagePath('hero-services.jpg'),
  petroleum: getImagePath('hero-petroleum.jpg'),
} as const;

// Export individual image paths for convenience
export const {
  about: heroAbout,
  contact: heroContact,
  locator: heroLocator,
  services: heroServices,
  petroleum: heroPetroleum,
} = heroImages; 