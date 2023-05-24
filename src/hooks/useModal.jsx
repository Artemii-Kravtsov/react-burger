import { useState, useCallback } from "react";

export const useModal = (onOpen, onClose) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState()

  const openModal = useCallback((data) => {
    setModalData(data)
    setIsModalOpen(true)
    onOpen && onOpen(data)
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setModalData()
    onClose && onClose()
  }, []);

  return [
    isModalOpen,
    openModal,
    closeModal,
    modalData,
  ];
};