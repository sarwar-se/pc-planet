import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Color, Variant } from 'react-bootstrap/esm/types';

type ModalSize = 'sm' | 'lg' | 'xl';
type BackdropType = true | false | 'static';

type ModalProps = {
  show: boolean;
  title?: string;
  titleClassName?: string;
  children: React.ReactNode;
  animation?: boolean;
  handleCancelButton: () => void;
  handleAcceptButton?: () => void;
  cancelButtonText?: string;
  acceptButtonText?: string;
  cancelBtnVariant?: Variant;
  acceptBtnVariant?: Color;
  hideFooter?: boolean;
  hideHeader?: boolean;
  hideAcceptButton?: boolean;
  hideCancelButton?: boolean;
  disableAcceptButton?: boolean;
  size?: ModalSize;
  scrollable?: boolean;
  backdrop?: BackdropType;
  centered?: boolean;
};

const AppModal: React.FC<ModalProps> = ({
  show,
  title,
  titleClassName,
  children,
  animation,
  handleCancelButton,
  handleAcceptButton,
  cancelButtonText = 'Cancel',
  acceptButtonText = 'Ok',
  cancelBtnVariant = 'danger',
  acceptBtnVariant = 'success',
  hideHeader = false,
  hideFooter = false,
  hideCancelButton = false,
  hideAcceptButton = false,
  size = 'md',
  disableAcceptButton = false,
  ...rest
}) => {
  return (
    <Modal
      show={show}
      onHide={handleCancelButton}
      animation={animation}
      size={size as ModalSize}
      {...rest}
    >
      {!hideHeader && (
        <Modal.Header closeButton>
          <Modal.Title className={titleClassName}>{title}</Modal.Title>
        </Modal.Header>
      )}
      <Modal.Body>{children}</Modal.Body>
      {!hideFooter && (
        <Modal.Footer>
          {!hideCancelButton && (
            <Button variant={cancelBtnVariant} onClick={handleCancelButton}>
              {cancelButtonText}
            </Button>
          )}
          {!hideAcceptButton && (
            <Button
              variant={acceptBtnVariant}
              onClick={handleAcceptButton}
              disabled={disableAcceptButton}
            >
              {acceptButtonText}
            </Button>
          )}
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default AppModal;
