"use client";

import React, { createContext, useContext, useState } from "react";
import Modal from "@/components/Modal";


const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => setModalContent(content);
  const closeModal = () => setModalContent(null);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modalContent && <Modal isOpen={true} onClose={closeModal}>{modalContent}</Modal>}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
