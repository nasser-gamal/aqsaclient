/* eslint-disable react/prop-types */


import { GrClose } from 'react-icons/gr';

import './modal.modules.css';
import Portal from '../../../utils/Portal';


export default function Modal({ isOpen, title, closeModalHandler, children }) {
  return (
    <Portal>
      <div
        className={
          isOpen ? `show-modal modal show` : ` modal`
        }
      >
        <div className="modal-container">
          <div className="modal-content"
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
            <div className="modal-body">
              {children}
            </div>
          </div>
        </div>
      </div>
    </Portal>

  )
}

