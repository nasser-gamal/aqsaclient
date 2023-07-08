/* eslint-disable react/prop-types */
import { useState } from 'react';
import Modal from '../../common/Modal/Modal'
import { validateConfirmPassword } from '../../../utils/validation';
import { notify } from '../../../utils/notify';
import CustomInput from '../../common/FormFields/input/CustomInput';
import FormButtons from '../FormButtons/FormButtons';

export default function DeleteModal({ modalTitle, childrenProps }) {

  const [password, setPassword] = useState();

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

  const closeModalHandler = () => {
    childrenProps.setIsOpen(false)
  }

  return (
    <Modal
      isOpen={childrenProps.isOpen}
      title={modalTitle}
      closeModalHandler={closeModalHandler}
    >
      <div className="delete-confirm">
        <div>
          <p>
            {childrenProps.deleteMsg}
          </p>
        </div>
        <form onSubmit={onSubmit}>
          <CustomInput
            type='password'
            name='password'
            placeholder='ادخل الرقم السري'
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormButtons />
        </form>
      </div>
    </Modal>
  )
}
