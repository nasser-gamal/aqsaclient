import { useEffect, useState } from 'react';
import CustomInput from '../../common/FormFields/input/CustomInput';
import FormButtons from '../../UI/FormButtons/FormButtons';
import { useUpdatePasswordMutation } from '../../../app/features/user/agentApi';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';
import { notify } from '../../../utils/notify';
import { closeModal } from '../../../app/features/modal/modalSlice';


export default function UpdateAgentPassword() {
  const dispatch = useDispatch();
  const { childrenProps } = useSelector(state => state.modal);

  const [password, setPassword] = useState();

  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();


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
      const response = await
        updatePassword(
          { agentId: childrenProps.id, password }
        ).unwrap();
      notify('success', response.message);
      setTimeout(() => {
        dispatch(closeModal())
      }, 1000)
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
          placeholder={'ادخل الرقم السري'}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormButtons />
      </form>
    </>
  )
}
