import { useEffect, useRef } from "react";

export const Modal = ({
  children,
  onClose,
  isOpen,
}: {
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog className="modal" ref={modalRef}>
      <div className="modal-box">{children}</div>
      <form method="dialog" className="modal-backdrop" onSubmit={onClose}>
        <button className="!cursor-default">Close</button>
      </form>
    </dialog>
  );
};
