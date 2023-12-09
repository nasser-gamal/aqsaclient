/* eslint-disable react/prop-types */


import { GrClose } from 'react-icons/gr';

import './modal.modules.css';
import Portal from '../../../utils/Portal';
import { useDispatch } from 'react-redux';
import { useClickOutside } from '@mantine/hooks';
import { closeModal } from '../../../app/features/modal/modalSlice';


export default function CustomModal({ isOpen, title, innerProps, closeModalHandler, children }) {

  const dispatch = useDispatch()
  const ref = useClickOutside(() => dispatch(closeModal()));

  return (
    <Portal>
      <div
        className={
          isOpen ? `show-modal modal show` : ` modal`
        }
      >
        <div className="modal-container" >
          <div className="modal-content"
            ref={ref}
            style={{
              width: innerProps?.width
            }}
          >
            <div className="modal-header">
              <h4>
                {title}
              </h4>
              <div className="modal-close">
                <GrClose
                  onClick={closeModalHandler}
                />
              </div>
            </div>
            <div
              className="modal-body">
              {children}
            </div>
          </div>
        </div>
      </div>
    </Portal>
  )
}

