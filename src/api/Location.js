import { get } from './Methods';

export const getSites = () => {
  const requestUrl = 'PracticeLocation/PracticeLocations';
  return get(requestUrl);
}
