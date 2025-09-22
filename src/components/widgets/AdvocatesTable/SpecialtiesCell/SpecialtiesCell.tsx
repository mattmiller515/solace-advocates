import { Modal } from "@/components/core/Modal";
import { useState } from "react";

export const SpecialtiesCell = ({
  advocateFirstName,
  advocateLastName,
  specialties,
}: {
  advocateFirstName: string;
  advocateLastName: string;
  specialties: string[];
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const specialtiesPreview = specialties.slice(0, 5);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ul className="list-disc list-inside">
        {specialtiesPreview.map((specialty: string) => (
          <li key={specialty}>{specialty}</li>
        ))}
        {specialties.length > 5 && (
          <>
            <li className="mt-4 list-none">
              <button className="underline" onClick={handleOpenModal}>
                View All ({specialties.length})
              </button>
            </li>
          </>
        )}
      </ul>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h3 className="text-lg font-bold mb-8 text-center">
          {advocateFirstName} {advocateLastName}'s Specialties
        </h3>
        <ul className="list-disc list-inside">
          {specialties.map((specialty: string) => (
            <li key={specialty}>{specialty}</li>
          ))}
        </ul>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-primary" onClick={handleCloseModal}>
              Close
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};
