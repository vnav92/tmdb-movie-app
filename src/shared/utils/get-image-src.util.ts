import { IMAGE_API_URL } from '../../configs';

export const getImageSrc = (baseSrc: string) => `${IMAGE_API_URL}/${baseSrc}`;
