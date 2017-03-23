import { Modal } from 'antd';
import axios from 'axios';
import { apiConfig } from '../../configs';
import { confirmGoToClient } from './ConfirmGoToClient';

const { coreplusWebClientURL, headers } = apiConfig;
const { confirm } = Modal;

const confirmActivate = (id) => {
  confirm({
    title: 'Confirm',
    content: 'Are you sure with to re-open this clients file?',
    onOk() {
      const requestUrl = `${coreplusWebClientURL}api/Client/ActivateClient?id=${id}`;
      axios.get(requestUrl, { headers })
        .then(() => {
          confirmGoToClient(id);
        });
    },
    onCancel() {

    }
  });
}

export { confirmActivate };
