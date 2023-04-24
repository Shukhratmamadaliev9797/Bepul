import React from "react";
import { Modal, Button } from "rsuite";
import { Oval } from "react-loader-spinner";

export default function Delete({ open, handleClose, action, loading }) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Modal.Header>
        <Modal.Title>Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure to delete it?</Modal.Body>
      <Modal.Footer>
        <Button onClick={action} appearance="primary">
          {loading ? (
            <Oval
              height={20}
              width={20}
              color="#fff"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#4fa94d"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          ) : (
            "Delete"
          )}
        </Button>
        <Button onClick={handleClose} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
