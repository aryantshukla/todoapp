import React from 'react';
import { useState } from 'react';
import { MainSection } from './features/MainSection';
import { Header } from './Header';
import { InfoModal } from './features/modal/InfoModal.js'
import { ModalContext } from './context';

import './App.css';

function App() {

  const [showModal, setShowModal] = useState(0)
  const [details, setDetails] = useState(() => ({}))

  const updateModal = ({ showModal, details }) => {
    setShowModal(showModal)
    setDetails(details)
  }
  const classForBlurContainer = showModal === 0 ? "blurContainer" : "blur"

  return (
    <ModalContext.Provider value={{ updateModal }}>
      <InfoModal show={showModal} details={details} />
      <main className={classForBlurContainer}>
        <Header />
        <MainSection />
      </main>
    </ModalContext.Provider>
  );
}

export default App;
