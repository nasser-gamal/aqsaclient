import { Route, Routes } from "react-router-dom";

import HomePage from "../pages/Home/HomePage"
import UsersPage from "../pages/Users/UsersPage";
import AgentsPage from "../pages/agents/AgentsPage";
import BankAccountsPage from "../pages/BankAccounts/BankAccountsPage";
import BankPage from "../pages/Banks/BanksPage";
import DepositPage from "../pages/transaction/Deposit/DepositPage";
import CategoryPage from "../pages/Category/CategoryPage";
import SegmentPage from "../pages/Segment/SegmentPage";
import CommissionPage from "../pages/Commission/CommissionPage";
import WithdrawPage from "../pages/transaction/WithDraw/WithdrawPage";
import TransferPage from "../pages/transaction/Transfer/TransferPage";
import BankAccountReportPage from "../pages/Reports/BankAccountReport/BankAccountReportPage";
import EmployReportPage from "../pages/Reports/EmployReport/EmployReportPage";
import DayReportPage from "../pages/Reports/DayReport/DayReportPage";
import NewCommissionPage from "../pages/NewCommission/NewCommissionPage";
import LoginPage from "../pages/Login/LoginPage";
import PrivateRoute from "./PrivateRoute";
import ForceRedirect from "./ForceRedirect";
import AgentRoute from "./AgentRoutes";
import AgentCommissionPage from "../pages/AgentCommission/AgentCommissionPage";
import AdminRoute from "./AdminRoutes";
import EditCommissionPage from "../pages/EditCommission/EditCommissionPage";
import AgentSegmentsPage from "../pages/AgentSegments/AgentSegmentsPage";
import TransferReportPage from "../pages/Reports/TransferReport/TransferReportPage";
import ProfitPage from "../pages/Profit/ProfitPage";
import FeesPage from "../pages/Fees/FeesPage";
import FeesReportPage from "../pages/Reports/FeesReport/FeesReportPage";


const Router = () => {

  return (
    <Routes>
      <Route element={<AdminRoute />}>
        <Route
          path="/users"
          element={
            <UsersPage />
          }
        />
        <Route
          path="/agents"
          element={
            <AgentsPage />
          }
        />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route
          path="/"
          element={
            <HomePage />
          }
        />
        <Route
          path="/services"
          element={
            <CategoryPage />
          }
        />
        <Route
          path="/segments"
          element={<SegmentPage />}
        />
        <Route
          path="/commissions"
          element={<CommissionPage />}
        />
        <Route
          path="/commission/new"
          element={<NewCommissionPage />}
        />
        <Route
          path="/commission/edit"
          element={<EditCommissionPage />}
        />
        <Route
          path="/banks"
          element={
            <BankPage />
          }
        />
        <Route
          path="/bankAccounts"
          element={
            <BankAccountsPage />
          }
        />
        <Route
          path="/deposit"
          element={<DepositPage />}
        />
        <Route
          path="/withdraws"
          element={<WithdrawPage />}
        />
        <Route
          path="/transfers"
          element={<TransferPage />}
        />
        <Route
          path="/fees"
          element={<FeesPage />}
        />
        <Route
          path="/employReport"
          element={<EmployReportPage />}
        />
        <Route
          path="/bankAccountReport"
          element={<BankAccountReportPage />}
        />
        <Route
          path="/dayReport"
          element={<DayReportPage />}
        />
        <Route
          path="/transferReport"
          element={<TransferReportPage />}
        />
        <Route
          path="/feesReport"
          element={<FeesReportPage />}
        />
        <Route
          path="/profits"
          element={<ProfitPage />}
        />
      </Route>
      <Route element={<AgentRoute />}>
        <Route
          path="/agent/segments"
          element={<AgentSegmentsPage />}
        />
        <Route
          path="/agent/commissions"
          element={<AgentCommissionPage />}
        />
      </Route>
      <Route element={<ForceRedirect />}>
        <Route
          path="/login"
          element={
            <LoginPage />
          }
        />
      </Route>
    </Routes>
  );
};

export default Router;