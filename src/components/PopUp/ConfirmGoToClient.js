import { Modal } from 'antd';

const { confirm } = Modal;

const confirmGoToClient = (id) => {
  confirm({
    title: 'Confirm',
    content: 'Would you like to go to this client file?',
    onOk() {
      window.parent.selectClient(id);
    },
    onCancel() {

    }
  });
}

export { confirmGoToClient };
