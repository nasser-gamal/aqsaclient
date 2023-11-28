/* eslint-disable react/prop-types */

import { modals } from '@mantine/modals';
import { Button, Table } from '@mantine/core';


import DateAndTime from '../../UI/DateAndTime/DateAndTime';
import showImg from '../../../assets/icons/picture.png'
import { useDeleteAppMutation } from '../../../app/features/applications/applicationsApi';
import CustomTable from '../../common/CustomTable/CustomTable';
import DeleteModal from '../../UI/DeleteModal/DeleteModal';



export default function AppTable({ data }) {


  const theads = [
    {
      title: "التاريخ",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "اسم التطبيق",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "تحميل مباشر",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "رابط تحميل",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "صورة التطبيق",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "ملحوظة",
      className: "note",
      order: "note",
      sort: "ASC",
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






  const [deleteAgentTreasury] = useDeleteAppMutation();





  const rows = data?.map((element) => (
    <Table.Tr key={element.id} className={element?.isDeleted == true ? 'deleted-row' : ''}>
      <td>
        <DateAndTime createdAt={element.createdAt} />
      </td>
      <td>
        {element.name}
      </td>
      <td>
        {element.isLink ? "لا" : 'نعم'}
      </td>
      <td>
        {element.link || '-'}
      </td>
      <td>
        <a target='_blanc' href={`${import.meta.env.VITE_API_BASE_URL}/${element.img}`}>
          <img style={{ width: '30px', cursor: 'pointer' }} src={showImg} alt={showImg} />
        </a>
      </td>
      <td>
        {element.note || "-"}
      </td>
        <>
          <Table.Td>
          <Button
            disabled={element?.isDeleted}

              type="button"
              size="xs"
              color="rgba(13, 148, 45, 1)"
              onClick={() =>
                modals.openContextModal({
                  modal: 'AddEditApp',
                  title: 'تعديل التطبيق',
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

              title={'حذف تطبيق'}
              text='هل أنت متأكد من حذف التطبيق ؟'
              handleDelete={deleteAgentTreasury}
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
