
import { useFindAllBanksQuery } from '../../../app/features/bank/bankApi';
import EditButton from '../../UI/TableButtons/EditButton';
import Table from '../../common/Table/Table';
import DateAndTime from '../../UI/DateAndTime/DateAndTime';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';

export default function FeesTable() {

  const dispatch = useDispatch();
  const { data, isFetching } = useFindAllBanksQuery();

  const tableHead = [
    {
      title: "اسم البنك",
      className: "account-name",
      order: "accountName",
      sort: "ASC",
    },
    {
      title: "ملحوظة",
      className: "note",
      order: "note",
      sort: "ASC",
    },
    {
      title: "التاريخ",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "تعديل",
      className: "",
      order: "",
      sort: "",
    },
    // {
    //   title: "حذف",
    //   className: "",
    //   order: "",
    //   sort: "",
    // },
  ]



  useEffect(() => {
    if (isFetching) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isFetching]);


  return (
    <Table tableHead={tableHead}>
      <tbody>
        {
          data?.banks.map(bank => {
            return <tr key={bank.id}>
              <td>{bank.bankName}</td>
              <td>{bank.note || "-"}</td>
              <td>
                <DateAndTime createdAt={bank.createdAt} />
              </td>
              <td>
                <EditButton
                  editProps={{
                    name: 'AddEditBank',
                    modalTitle: 'تعديل الحساب',
                    status: 'تعديل',
                    childrenProps: { bank }
                  }}
                />
              </td>
            </tr>
          })
        }
      </tbody>
    </Table>
  )
}
