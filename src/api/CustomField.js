import { get, post } from './Methods';

export const getCustomFieldsByClients = (ids) => {
  const requestUrl = 'Client/GetCustomFieldListByClientIds';
  return post(requestUrl, ids);
};

export const getCustomFields = () => {
  const requestUrl = 'Client/GetCustomFieldList';

  return get(requestUrl);
}
