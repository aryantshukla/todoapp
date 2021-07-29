import React from 'react';
import { useState } from 'react';
import { MainSection } from './features/MainSection';
import { Header } from './Header';
import { InfoModal } from './features/modal/InfoModal.js'
import { ModalContext } from './context';
import { TimeTakenModal } from './features/modal/TimeTakenModal';

import './App.css';


function App() {

  const [showModal, setShowModal] = useState('nomodal')
  const [details, setDetails] = useState(() => ({}))

  const updateModal = ({ showModal, details }) => {
    setShowModal(showModal)
    setDetails(details)
  }
  const classForBlurContainer = showModal === 'nomodal' ? "blurContainer" : "blur"

  return (
    <ModalContext.Provider value={{ updateModal }}>
      <InfoModal show={showModal} details={details} />
      <TimeTakenModal show={showModal} details={details} />
      <main className={classForBlurContainer}>
        <Header />
        <MainSection />
      </main>
    </ModalContext.Provider>
  );
}

export default App;
