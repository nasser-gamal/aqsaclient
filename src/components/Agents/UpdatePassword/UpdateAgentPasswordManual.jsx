import { useEffect, useState } from 'react';
import CustomInput from '../../common/FormFields/input/CustomInput';
import FormButtons from '../../UI/FormButtons/FormButtons';
import { useUpdatePasswordManualMutation } from '../../../app/features/user/userApi';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';
import { notify } from '../../../utils/notify';
import { closeModal } from '../../../app/features/modal/modalSlice';
import { validatePassword } from '../../../utils/validation';


export default function UpdateAgentPasswordManual() {
  const dispatch = useDispatch();
  const { childrenProps } = useSelector(state => state.modal);

  const [password, setPassword] = useState();

  const [updatePassword, { isLoading }] = useUpdatePasswordManualMutation();


  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [isLoading, dispatch]);



  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const error = validatePassword(password);
      if (error) {
        notify('error', error)
      } else {
        const response = await
          updatePassword(
            { userId: childrenProps.id, password }
          ).unwrap();
        notify('success', response.message);
        setTimeout(() => {
          dispatch(closeModal())
        }, 1000)
      }
    } catch (err) {
      notify('error', err.data.message)
    }
  }


  return (
    <>
      <form onSubmit={onSubmit}>
        <CustomInput
          type='password'
          name='password'
          placeholder={'ادخل الرقم السري الجديد للحساب'}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormButtons />
      </form>
    </>
  )
}
