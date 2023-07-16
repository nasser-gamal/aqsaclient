import { useDispatch, useSelector } from 'react-redux';

import Modal from './Modal'
import { closeModal } from '../../../app/features/modal/modalSlice';

import AddEditUser from '../../Users/AddEditUser/AddEditUser';
import UserTransaction from '../../Users/UserTransaction/UserTransaction';
import UpdateUserPassword from '../../Users/UpdatePassword/UpdateUserPassword';
import UpdateAgentPassword from '../../Agents/UpdatePassword/UpdateAgentPassword';
import AddEditCategory from '../../Category/AddEditCategory/AddEditCategory';
import AddEditSegment from '../../Segment/AddEditSegment/AddEditSegment';
import AddEditAgent from '../../Agents/AddEditAgent/AddEditAgent';
import AddEditBank from '../../Banks/AddEditBank/AddEditBank';
import AddEditDeposit from '../../Transaction/Deposit/AddEditDeposit/AddEditDeposit';
import AddEditWithdraw from '../../Transaction/WithDraw/AddEditWithdraw/AddEditWithdraw';
import AddEditTransfer from '../../Transaction/Transfer/AddEditTransfer/AddEditTransfer';
import AddEditBankAccount from '../../BankAccounts/AddEditBankAccount/AddEditBankAccount';
import DeleteConfirm from '../../DeleteConfirm/DeleteConfirm';

export default function ModalManager() {

  const dispatch = useDispatch();

  const { isOpen, componentName, modalTitle, childrenProps } = useSelector(
    (state) => state.modal
  );

  const closeModalHandler = () => dispatch(closeModal());

  const componentsLookUp =
  {
    DeleteConfirm,
    AddEditUser,
    UpdateUserPassword,
    UpdateAgentPassword,
    AddEditCategory,
    AddEditSegment,
    UserTransaction,
    AddEditAgent,
    AddEditBankAccount,
    AddEditBank,
    AddEditDeposit,
    AddEditWithdraw,
    AddEditTransfer,
  };

  let renderComponent;
  if (componentName) {
    const SelectedComponent = componentsLookUp[componentName];
    if (SelectedComponent) {
      renderComponent = <SelectedComponent {...childrenProps} />;
    }
  }


  return (
    <Modal
      isOpen={isOpen}
      componentName={componentName}
      closeModalHandler={closeModalHandler}
      title={modalTitle}
      childrenProps={childrenProps}
    >
      {renderComponent}
    </Modal>
  )
}
