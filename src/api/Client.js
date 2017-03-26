import { get, post } from './Methods';

export const getClients = (pageNumber, pageSize, payload) => {
  const requestUrl = `Client/GetClientListDataSource?pageNumber=${pageNumber}&pageSize=${pageSize}`;

  return post(requestUrl, payload);
};

export const getClientGroups = () => {
  const requestUrl = 'Client/ClientGroups';

  return get(requestUrl);
};
