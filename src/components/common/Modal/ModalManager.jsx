import { useDispatch, useSelector } from 'react-redux';

import Modal from './Modal'
import { closeModal } from '../../../app/features/modal/modalSlice';

import AddEditUser from '../../Users/AddEditUser/AddEditUser';
import UpdateUserPassword from '../../Users/UpdatePassword/UpdateUserPassword';
import UpdateUserPasswordManual from '../../Users/UpdatePassword/UpdateUserPasswordManual';
import UpdateAgentPassword from '../../Agents/UpdatePassword/UpdateAgentPassword';
import UpdateAgentPasswordManual from '../../Agents/UpdatePassword/UpdateAgentPasswordManual';
import AddEditCategory from '../../Category/AddEditCategory/AddEditCategory';
import AddEditSegment from '../../Segment/AddEditSegment/AddEditSegment';
import AddEditAgent from '../../Agents/AddEditAgent/AddEditAgent';
import AddEditBank from '../../Banks/AddEditBank/AddEditBank';
import AddEditDeposit from '../../Transaction/Deposit/AddEditDeposit/AddEditDeposit';
import AddEditWithdraw from '../../Transaction/WithDraw/AddEditWithdraw/AddEditWithdraw';
import AddEditTransfer from '../../Transaction/Transfer/AddEditTransfer/AddEditTransfer';
import AddEditBankAccount from '../../BankAccounts/AddEditBankAccount/AddEditBankAccount';
import AddEditFees from '../../Fees/AddEditFee/AddEditFees';
import TransactionInfo from '../../UI/transactionModal/TransactionInfo';
import AddEditApp from '../../Apps/AddEditApp/AddEditApp';
import AddEditProvider from '../../Provider/AddEditProvider/AddEditProvider';
import AddEditProviderCommission from '../../ProviderCommission/AddEditProviderCommission/AddEditProviderCommission';
import AddEditAgentTreasury from '../../AgentTreasury/AddEditAgentTreasury/AddEditAgentTreasury';
import AddEditProviderTreasury from '../../ProviderTreasury/AddEditProviderTreasury/AddEditProviderTreasury';
import AddEditAddionalTreasury from '../../AddionalTreasury/AddEditAddionalTreasury/AddEditAddionalTreasury';
import DeleteConfirm from '../../DeleteConfirm/DeleteConfirm';
import AddEditDues from '../../Dues/AddEditDues/AddEditDues';
import ReportPeriod from '../../Home/ReportPeriod/ReportPeriod';
import AddNewGroup from '../../chat/NewGroup/AddNewGroup';

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
    UpdateUserPasswordManual,
    UpdateAgentPasswordManual,
    AddEditCategory,
    AddEditSegment,
    AddEditAgent,
    AddEditBankAccount,
    AddEditBank,
    AddEditDeposit,
    AddEditWithdraw,
    AddEditTransfer,
    AddEditFees,
    AddEditProvider,
    AddEditProviderCommission,
    AddEditAgentTreasury,
    AddEditProviderTreasury,
    AddEditAddionalTreasury,
    TransactionInfo,
    AddEditApp,
    AddEditDues,
    ReportPeriod, AddNewGroup
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
