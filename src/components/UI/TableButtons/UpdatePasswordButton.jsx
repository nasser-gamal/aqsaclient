/* eslint-disable react/prop-types */
import { RiLockPasswordFill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { openModal } from '../../../app/features/modal/modalSlice';

export default function UpdatePasswordButton({ name, id }) {
  const dispatch = useDispatch();


  return (
    <RiLockPasswordFill
      style={{
        fontSize: "30px",
        color: "brown",
        cursor: "pointer",
      }}
      onClick={() =>
        dispatch(openModal(
          {
            name,
            modalTitle: 'تغير الرقم السري للحساب',
            status: 'تغير',
            childrenProps: { id }
          }
        ))}
    />
  )
}
