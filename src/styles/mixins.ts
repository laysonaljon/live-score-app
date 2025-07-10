import { css } from 'styled-components';

/**
 * Breakpoint sizes for responsive design.
 * These values represent the 'min-width' for each device type,
 * except for 'phonePortraitOnly' which is a 'max-width'.
 */
export const sizes = {
  phonePortraitWidth: 480,
  phoneLandscapeWidth: 481,
  tabletPortraitWidth: 768,
  tabletLandscapeWidth: 1024,
  desktopWidth: 1200,
};

/**
 * Media query helper functions.
 * Use these to apply styles at specific breakpoints.
 */
export const media = {
  phonePortraitOnly: (...args: Parameters<typeof css>) => css`
    @media (max-width: ${sizes.phonePortraitWidth}px) {
      ${css(...args)}
    }
  `,
  phoneLandscapeUp: (...args: Parameters<typeof css>) => css`
    @media (min-width: ${sizes.phoneLandscapeWidth}px) {
      ${css(...args)}
    }
  `,
  tabletPortraitUp: (...args: Parameters<typeof css>) => css`
    @media (min-width: ${sizes.tabletPortraitWidth}px) {
      ${css(...args)}
    }
  `,
  tabletLandscapeUp: (...args: Parameters<typeof css>) => css`
    @media (min-width: ${sizes.tabletLandscapeWidth}px) {
      ${css(...args)}
    }
  `,
  desktopUp: (...args: Parameters<typeof css>) => css`
    @media (min-width: ${sizes.desktopWidth}px) {
      ${css(...args)}
    }
  `,
};

/**
 * Mixin for centering content using flexbox.
 * @param direction 'row' | 'column' - The flex direction. Defaults to 'row'.
 */
export const flexCenter = (direction: 'row' | 'column' = 'row') => css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${direction};
`;

/**
 * Mixin for applying a smooth transition to specified properties.
 * This is more flexible, similar to SASS's `transition($transition...)`.
 * @param transitionProperties - A string representing CSS transition properties (e.g., 'all 0.3s ease', 'background-color 0.2s linear, transform 0.3s ease-out').
 */
export const transition = (transitionProperties: string = 'all 0.3s ease-in-out') => css`
  transition: ${transitionProperties};
`;
