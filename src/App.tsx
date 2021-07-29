import { useState } from 'react';
import { MainSection } from './features/MainSection';
import { Header } from './Header';
import { InfoModal } from './features/modal/InfoModal'
import { ModalContext } from './context';
import { TimeTakenModal } from './features/modal/TimeTakenModal';

import './App.css';
import { todoType } from './types/types';

import { updateModalProps } from './types/types';


function App() {

  const [showModal, setShowModal] = useState('nomodal')
  const [details, setDetails] = useState<todoType>({} as todoType)
  const [theme, setTheme] = useState<'light'|'dark'>('light')

  const handleChangeTheme = () => {
    setTheme(state => (state === 'light' ? 'dark' : 'light'))
  }

  const updateModal = ({ showModal, details }:updateModalProps) => {
    setShowModal(showModal)
    setDetails(details)
  }
  const classForBlurContainer = showModal === 'nomodal' ? "blurContainer" : "blur"

  return (
    <ModalContext.Provider value={{ updateModal }}>
      <div className="themeContainer" data-theme={theme}>
        <InfoModal show={showModal} details={details} />
        <TimeTakenModal show={showModal} details={details} />
        <main className={classForBlurContainer}>
          <Header onClick={handleChangeTheme} theme={theme} />
          <MainSection />
        </main>
      </div>
    </ModalContext.Provider >
  );
}

export default App;
