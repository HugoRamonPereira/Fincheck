import { Modal } from '../../../../components/Modal';
import { useNewAccountModalController } from './useNewAccountModalController';

export function NewAccountModal() {
  const { closeNewAccountModal, isNewAccountModalOpen } = useNewAccountModalController();

  return (
    <Modal
      title='New account'
      open={isNewAccountModalOpen}
      onClose={closeNewAccountModal}
    >
      NewAccountModal
    </Modal>
  );
}