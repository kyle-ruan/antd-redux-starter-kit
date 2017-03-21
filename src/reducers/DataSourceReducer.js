const INITIAL_STATE = {
  clients: {
    data: [],
    total: 0,
    loading: false,
    currentPage: 1,
    pageSize: 50
  },
  clientGroups: { data: [], loading: false },
  sites: { data: [], loading: false },
  customFields: { data: [], loading: false }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CLIENT_START_LOADING':
      return {
        ...state,
        clients: {
          ...state.clients,
          loading: true,
          currentPage: action.payload.pageNumber,
          pageSize: action.payload.pageSize
        }
      };

    case 'CLIENT_FINISH_LOADING':
      const { clients, total } = action.payload;
      return {
        ...state,
        clients: {
          ...state.clients,
          data: clients,
          loading: false,
          total
        }
      };

    case 'CLIENT_GROUPS_START_LOADING':
      return {
        ...state,
        clientGroups: {
          ...state.clientGroups,
          loading: true
        }
      };

    case 'CLIENT_GROUPS_FINISH_LOADING':
      return {
        ...state,
        clientGroups: {
          ...state.clientGroups,
          data: action.payload.clientGroups,
          loading: false
        }
      };

    case 'SITES_START_LOADING':
      return {
        ...state,
        sites: {
          ...state.sites,
          loading: true
        }
      };

    case 'SITES_FINISH_LOADING':
      return {
        ...state,
        sites: {
          ...state.sites,
          data: action.payload.sites,
          loading: false
        }
      };

    case 'CUSTOM_FIELDS_START_LOADING':
    return {
      ...state,
      customFields: {
        ...state.customFields,
        loading: true
      }
    };
    case 'CUSTOM_FIELDS_FINISH_LOADING':
      return {
        ...state,
        customFields: {
          ...state.customFields,
          data: action.payload.customFields,
          loading: false
        }
      };

    case 'UPDATE_CLIENTS_CUSTOM_FIELDS':
      const customFieldsOfClients = action.payload.customFieldsOfClients;
      const clientsWithCustomFields = state.clients.data.map((client) => {
        const clientIdFound = Object.keys(customFieldsOfClients).find((clientId) => {
          return clientId.toString() === client.id.toString();
        });

        if(!!clientIdFound)
          return { ...client, customFields: customFieldsOfClients[clientIdFound] };
        else {
          return client;
        }
      });
      return {
        ...state,
        clients: {
          ...state.clients,
          data: clientsWithCustomFields
        }
      };
    default:
      return state;
  }
}
