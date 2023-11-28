import '@mantine/core/styles.css';
import { MantineProvider, DirectionProvider } from '@mantine/core';
import { theme } from './theme';
import { ModalsProvider } from '@mantine/modals';

import './App.css'
import { useSelector } from 'react-redux';

import Router from "./routes/Routes";

import ResponseMsg from './components/UI/ResponseMsg/ResponseMsg';
import ModalManager from './components/common/Modal/ModalManager';
import Loader from './components/UI/Loader/Loader';
import AddEditDeposit from './components/Transaction/Deposit/AddEditDeposit/AddEditDeposit';
import AddEditUser from './components/Users/AddEditUser/AddEditUser';
import UpdateUserPasswordManual from './components/Users/UpdatePassword/UpdateUserPasswordManual';
import UpdateUserPassword from './components/Users/UpdatePassword/UpdateUserPassword';
import AddEditBank from './components/Banks/AddEditBank/AddEditBank';
import AddEditBankAccount from './components/BankAccounts/AddEditBankAccount/AddEditBankAccount';
import AddEditTransfer from './components/Transaction/Transfer/AddEditTransfer/AddEditTransfer';
import AddEditFees from './components/Fees/AddEditFee/AddEditFees';
import AddEditCategory from './components/Category/AddEditCategory/AddEditCategory';
import AddEditSubCategory from './components/SubCategory/AddEditSubCategory';
import AddEditWithdraw from './components/Transaction/WithDraw/AddEditWithdraw/AddEditWithdraw';
import AddEditSegment from './components/Segment/AddEditSegment/AddEditSegment';
import AddEditProvider from './components/Provider/AddEditProvider/AddEditProvider';
import AddEditProviderCommission from './components/ProviderCommission/AddEditProviderCommission/AddEditProviderCommission';
import AddEditAgentTreasury from './components/AgentTreasury/AddEditAgentTreasury/AddEditAgentTreasury';
import AddEditProviderTreasury from './components/ProviderTreasury/AddEditProviderTreasury/AddEditProviderTreasury';
import AddEditAddionalTreasury from './components/AddionalTreasury/AddEditAddionalTreasury/AddEditAddionalTreasury';
import AddEditDues from './components/Dues/AddEditDues/AddEditDues';
import AddEditApp from './components/Apps/AddEditApp/AddEditApp';


function App() {
  const { isLoading } = useSelector(state => state.loader);

  const modals = {
    AddEditUser: AddEditUser,
    UpdateUserPasswordManual: UpdateUserPasswordManual,
    UpdateUserPassword: UpdateUserPassword,
    AddEditBank: AddEditBank,
    AddEditBankAccount: AddEditBankAccount,
    AddEditTransfer: AddEditTransfer,
    AddEditFees: AddEditFees,
    AddEditCategory: AddEditCategory,
    AddEditSubCategory: AddEditSubCategory,
    AddEditDeposit: AddEditDeposit,
    AddEditWithdraw: AddEditWithdraw,
    // AddEditWithdraw: (props) => (
    //   <AddEditWithdraw
    //     w={'3000px'}
    //     // ... (other props you pass to AddEditWithdraw)
    //     size={'lg'}// Customize the size here (e.g., 'xs', 'sm', 'md', 'lg', 'xl')
    //     {...props}
    //   />
    // ),
    AddEditSegment: AddEditSegment,
    AddEditProvider: AddEditProvider,
    AddEditProviderCommission: AddEditProviderCommission,
    AddEditAgentTreasury: AddEditAgentTreasury,
    AddEditProviderTreasury: AddEditProviderTreasury,
    AddEditAddionalTreasury: AddEditAddionalTreasury,
    AddEditDues: AddEditDues,
    AddEditApp: AddEditApp,
  }

  return (
    <>
      <DirectionProvider>
        <MantineProvider theme={theme}>
          <ModalsProvider
            modals={modals}
            labels={{ confirm: 'Submit', cancel: 'Cancel' }}
          >
            {isLoading && <Loader />}
            <ResponseMsg />
            <ModalManager />
            <Router />
          </ModalsProvider>
        </MantineProvider>
      </DirectionProvider>

    </>

  )
}

export default App
