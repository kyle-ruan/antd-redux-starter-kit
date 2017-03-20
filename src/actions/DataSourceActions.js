import axios from 'axios';
import { apiConfig, reportConfig } from '../configs';

const { coreplusWebClientURL, headers } = apiConfig;

export const getClientDataSource = (pageNumber) => {
  return (dispatch, getState) => {
    const { pageSize } = reportConfig;

    dispatch({
      type: 'CLIENT_START_LOADING',
      payload: { pageNumber, pageSize }
    });

    const requestUrl = `${coreplusWebClientURL}api/Client/GetClientListDataSource?pageNumber=${pageNumber}&pageSize=${pageSize}`;

    const { filters: { keyword, sites, clientGroups, status, customFieldFilters } } = getState();

    axios.post(requestUrl, JSON.stringify({
      Keyword: keyword,
      ClientGroups: clientGroups,
      Sites: sites,
      Status: status,
      CustomFieldFilters: customFieldFilters.map(({ id, value }) => {
        return { Id: id, Value: value };
      })
    }), { headers })
      .then(({ data }) => {
        const clients = data.Data;
        const total = data.Total;

        const clientIds = clients.map(client => client.id);
        const requestUrl = `${coreplusWebClientURL}api/Client/GetCustomFieldListByClientIds`;
        dispatch({
          type: 'CLIENT_FINISH_LOADING',
          payload: { clients, total }
        });
        return axios.post(requestUrl, JSON.stringify(clientIds), { headers });
      }).then(({data}) => {
        dispatch({
          type: 'UPDATE_CLIENTS_CUSTOM_FIELDS',
          payload: { customFieldsOfClients: data }
        });
      });
  };
};

export const getCustomFields = () => {
  return (dispatch) => {
    dispatch({ type: 'CUSTOM_FIELDS_START_LOADING' });
    const requestUrl = `${coreplusWebClientURL}api/Client/GetCustomFieldList`;

    axios.get(requestUrl, { headers})
      .then(({ data }) => {
        dispatch({
          type: 'CUSTOM_FIELDS_FINISH_LOADING',
          payload: { customFields: data }
        });
        dispatch({ type: 'ON_FILTER_LOAD' });
        dispatch(getClientDataSource(1));
      });
  };
};
