import React from 'react';
import { Toast, ToastBody, ToastContainer, ToastHeader } from 'react-bootstrap';
import { STATUS } from '../../constants/appConstants';

const AppToastContainer: React.FC<{
  status: STATUS;
  updateStatus: React.Dispatch<React.SetStateAction<STATUS>>;
  errorMessage: string;
  successMessage: string;
}> = ({ status, updateStatus, errorMessage, successMessage }) => {
  return (
    <ToastContainer position='bottom-end' className='position-fixed m-1'>
      <Toast
        onClose={() => updateStatus(STATUS.IDLE)}
        show={status === STATUS.ERROR}
        delay={4000}
        autohide
        bg='danger'
      >
        <ToastHeader>
          <strong className='me-auto'>Fail!</strong>
        </ToastHeader>
        <ToastBody className='text-white'>{errorMessage}</ToastBody>
      </Toast>

      <Toast
        onClose={() => updateStatus(STATUS.IDLE)}
        show={status === STATUS.SUCCESS}
        delay={4000}
        autohide
        bg='success'
      >
        <ToastHeader>
          <strong className='me-auto'>Success!</strong>
        </ToastHeader>
        <ToastBody className='text-white'>{successMessage}</ToastBody>
      </Toast>
    </ToastContainer>
  );
};

export default AppToastContainer;
