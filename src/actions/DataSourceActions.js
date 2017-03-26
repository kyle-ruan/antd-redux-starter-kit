import { reportConfig } from '../configs';
import * as api from '../api';

export const getClientDataSource = (pageNumber, sorter = null) => {
  return (dispatch, getState) => {
    const { pageSize } = reportConfig;
    if (sorter !== null && typeof(sorter.field) === 'undefined') {
      sorter = null;
    }
    dispatch({
      type: 'CLIENT_START_LOADING',
      payload: { pageNumber, pageSize }
    });

    const {
      filters: {
        keyword, name, medicare,
        details, detailsSearchFields, others,
        othersSearchFields, sites, clientGroups,
        status, customFieldFilters, showFilters
      }
    } = getState();

    if (showFilters) {
      dispatch({ type: 'TOGGLE_FILTERS'});
    }
    api.getClients(pageNumber, pageSize, {
      keyword,
      name,
      medicare,
      details,
      detailsSearchFields,
      others,
      othersSearchFields,
      clientGroups,
      sites,
      status,
      sorter,
      customFieldFilters: customFieldFilters.map(({ id, value }) => {
        return { id, value };
      })
    }).then(({ data }) => {
        const clients = data.Data;
        const total = data.Total;

        const clientIds = clients.map(client => client.id);
        dispatch({
          type: 'CLIENT_FINISH_LOADING',
          payload: { clients, total }
        });
        return api.getCustomFieldsByClients(clientIds);
      }).then(({data}) => {
        dispatch({
          type: 'UPDATE_CLIENTS_CUSTOM_FIELDS',
          payload: { customFieldsOfClients: data }
        });
      });
  };
};

export const getClientGroups = () => {
  return (dispatch) => {
    dispatch({ type: 'CLIENT_GROUPS_START_LOADING' });
    api.getClientGroups()
      .then(({data}) => {
        dispatch({
          type: 'CLIENT_GROUPS_FINISH_LOADING',
          payload: { clientGroups: data }
        })
      });
  };
};

export const getSites = () => {
  return (dispatch) => {
    dispatch({ type: 'SITES_START_LOADING' });

    api.getSites()
      .then(({data}) => {
        dispatch({
          type: 'SITES_FINISH_LOADING',
          payload: { sites: data }
        });
      });
  }
};

export const getCustomFields = () => {
  return (dispatch) => {
    dispatch({ type: 'CUSTOM_FIELDS_START_LOADING' });

    api.getCustomFields()
      .then(({ data }) => {
        dispatch({
          type: 'CUSTOM_FIELDS_FINISH_LOADING',
          payload: { customFields: data }
        });
      });
  };
};
