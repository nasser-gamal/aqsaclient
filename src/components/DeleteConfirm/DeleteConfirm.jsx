
import { useSelector } from 'react-redux';
import CustomInput from '../common/FormFields/input/CustomInput';
import FormButtons from '../Ui/FormButtons/FormButtons';
import { useState } from 'react';
import { validateConfirmPassword } from '../../utils/validation';
import {notify} from '../../utils/notify';

export default function DeleteConfirm() {
  const [password, setPassword] = useState();
  const { childrenProps } = useSelector(state => state.modal);
 
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const error = validateConfirmPassword(password);
      if (error) {
        notify('error', error);
      } else {
        const response = await childrenProps.deleteRequest({ id: childrenProps.id, password }).unwrap();
        notify('success', response.message);
      }
    } catch (err) {
      notify('error', err.data.message);
    }
  }

  return (
    <div className="delete-confirm">
      <div>
        <p>
          {childrenProps.message}
        </p>
      </div>
      <form onSubmit={onSubmit}>
        <CustomInput
          type='password'
          name='password'
          placeholder='ادخل الرقم السري'
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormButtons disabled={childrenProps.isLoading} />
      </form>
    </div>
  )
}
