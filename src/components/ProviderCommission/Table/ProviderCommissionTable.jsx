/* eslint-disable react/prop-types */

import DateAndTime from '../../UI/DateAndTime/DateAndTime';

import { Button, Table } from '@mantine/core';
import { modals } from '@mantine/modals';

import CustomTable from '../../common/CustomTable/CustomTable';
import ResotreButton from '../../UI/RestoreData/ResotreButton';
import DeleteModal from '../../UI/DeleteModal/DeleteModal';

import { useDeleteProviderCommissionMutation } from '../../../app/features/provider/providerCommissions';

export default function ProviderCommissionTable({ data }) {

  const theads = [
    {
      title: "التاريخ",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "اسم المزود",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "العمولة",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "ملحوظة",
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
    {
      title: "حذف",
      className: "",
      order: "",
      sort: "",
    },
  ]


  const [deleteProviderCommission] = useDeleteProviderCommissionMutation();
  console.log(data)



  const rows = data?.map((element) => (
    <Table.Tr key={element.id} className={element?.isDeleted == true ? 'deleted-row' : ''}>
      <Table.Td>
        <DateAndTime createdAt={element.date} />
      </Table.Td>
      <Table.Td>{element?.provider?.name}</Table.Td>
      <Table.Td>{element.commission}</Table.Td>
      <Table.Td>{element.note || "-"}</Table.Td>

      <>
        <Table.Td>
          <Button
            disabled={element?.isDeleted}
            type="button"
            size="xs"
            color="rgba(13, 148, 45, 1)"
            onClick={() =>
              modals.openContextModal({
                modal: 'AddEditProviderCommission',
                title: 'تعديل العمولة',
                innerProps: { status: 'edit', data: element }
              })
            }
          >
            تعديل
          </Button>
        </Table.Td>
        <Table.Td>
          <DeleteModal
            disabled={element?.isDeleted}
            title={'حذف عمولة مزود'}
            text='هل أنت متأكد من حذف العمولة ؟'
            handleDelete={deleteProviderCommission}
            id={element.id}
            onCancel={() => console.log('Cancel')}
          />
        </Table.Td>
      </>
    </Table.Tr >
  ));
  return (
    <CustomTable theads={theads} rows={rows} />
  )
}
