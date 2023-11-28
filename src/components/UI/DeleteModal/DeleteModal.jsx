/* eslint-disable react/prop-types */
import { Button, Text } from '@mantine/core'
import { modals } from '@mantine/modals';
import { notify } from '../../../utils/notify';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';

export default function DeleteModal({ title, text, handleDelete, id, onCancel, disabled }) {
  const dispatch = useDispatch()
  const onConfirm = async () => {
    try {
      console.log(id)
      dispatch(showLoader())
      const response = await handleDelete(id).unwrap();
      notify('success', response.message)
      dispatch(hideLoader())
    } catch (err) {
      dispatch(hideLoader())
      notify('error', err.data.message)
    }
  }


  const openDeleteModal = () =>
    modals.openConfirmModal({
      title,
      centered: true,
      children: (
        <Text size="sm">
          {text}
        </Text>
      ),
      labels: { confirm: 'حذف', cancel: "لا أريد الحذف" },
      confirmProps: { color: 'red' },
      onCancel,
      onConfirm,
    });
  return <Button
    size="xs"
    disabled={disabled}
    onClick={openDeleteModal} color="red">حذف</Button>;
}
