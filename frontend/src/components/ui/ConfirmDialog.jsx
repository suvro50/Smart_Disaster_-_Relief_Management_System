import Button from "./Button";
import Modal from "./Modal";

export default function ConfirmDialog({ open, title, onConfirm, onCancel }) {
  return (
    <Modal open={open} title={title} onClose={onCancel}>
      <div className="row">
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onConfirm}>Confirm</Button>
      </div>
    </Modal>
  );
}
