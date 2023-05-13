import { useState, useCallback } from "react";

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState()

  const openModal = useCallback((data) => {
    setModalData(data)
    setIsModalOpen(true)
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setModalData()
  }, []);

  return [
    isModalOpen,
    openModal,
    closeModal,
    modalData,
  ];
};