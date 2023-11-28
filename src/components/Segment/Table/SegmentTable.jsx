/* eslint-disable react/prop-types */

import { modals } from '@mantine/modals';
import { Button, Table } from '@mantine/core';
import CustomTable from '../../common/CustomTable/CustomTable';
import DateAndTime from '../../UI/DateAndTime/DateAndTime';
import DeleteModal from '../../UI/DeleteModal/DeleteModal';
import { useDeleteSegmentMutation } from '../../../app/features/segment/segmentApi';



export default function SegmentTable({ data }) {


  const theads = [
    {
      title: "الشريحة",
      className: "title",
      order: "title",
      sort: "ASC",
    },
    {
      title: "اسم الخدمة",
      className: "account-name",
      order: "accountName",
      sort: "ASC",
    },
    {
      title: "من",
      className: "start",
      order: "start",
      sort: "ASC",
    },
    {
      title: "إلي",
      className: "end",
      order: "end",
      sort: "ASC",
    },
    {
      title: "النسبة",
      className: "",
      order: "",
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
    {
      title: "حذف",
      className: "",
      order: "",
      sort: "",
    },
  ];

  const [deleteSegment] = useDeleteSegmentMutation()



  const rows = data?.map((element) => (
    <Table.Tr key={element.id} className={element?.isDeleted == true ? 'deleted-row' : ''}>      <Table.Td>{element.title}</Table.Td>
      <Table.Td>{element?.service?.name || "-"}</Table.Td>
      <Table.Td>{element.start}</Table.Td>
      <Table.Td>{element.end || "-"}</Table.Td>
      <Table.Td>{(element.percentage) + "%"}</Table.Td>
      <Table.Td>{element.note || "-"}</Table.Td>
      <Table.Td>
        <DateAndTime createdAt={element.createdAt} />
      </Table.Td>
      <>
        <Table.Td>
          <Button
            type="button"
            disabled={element?.isDeleted}
            size="xs"
            color="rgba(13, 148, 45, 1)"
            onClick={() =>
              modals.openContextModal({
                modal: 'AddEditSegment',
                title: 'تعديل الشريحة',
                innerProps: { status: 'edit', data: element }
              })
            }
          >
            تعديل
          </Button>
        </Table.Td>
        <Table.Td>
          <DeleteModal
            title={'حذف شريحة'}
            disabled={element?.isDeleted}
            text='هل أنت متأكد من حذف الشريحة ؟'
            handleDelete={deleteSegment}
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
