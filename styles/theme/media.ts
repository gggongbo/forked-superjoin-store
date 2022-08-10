export const deviceSizes = {
  mobile: 600,
  tablet: 1024,
  laptop: 1920,
};

export const media = {
  mobile: `only screen and (max-width: ${deviceSizes.mobile}px)`,
  tablet: `only screen and (min-width: ${deviceSizes.mobile}px) and (max-width: ${deviceSizes.tablet}px)`,
  laptop: `only screen and (min-width: ${deviceSizes.tablet}px)`,
};
