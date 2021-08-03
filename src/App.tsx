import { useState, useCallback } from 'react';

import { ModalContext } from './context';

import { MainSection } from './features/MainSection';
import { Header } from './Header';
import { InfoModal } from './features/modal/InfoModal'
import { TimeTakenModal } from './features/modal/TimeTakenModal';
import { Error } from './features/error/Error';

import { todoType, updateModalProps } from './types/types';

import './App.css';

function App() {

  const [showModal, setShowModal] = useState('nomodal')
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const [details, setDetails] = useState<todoType>({} as todoType)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const handleChangeTheme = () => {
    setTheme(state => (state === 'light' ? 'dark' : 'light'))
  }

  const updateModal = useCallback(({ showModal, details }: updateModalProps) => {
    setShowModal(showModal)
    setDetails(details)
  }, [])

  const updateShowError = useCallback((msg: string) => {
    setShowError(error => !error)
    setErrorMessage(msg)
  }, [setShowError])

  const classForBlurContainer = showModal === 'nomodal' ? "blurContainer" : "blur"

  return (
    <ModalContext.Provider value={{ updateModal, updateShowError, showError, errorMessage }}>
      <div className="themeContainer" data-theme={theme}>
        <InfoModal show={showModal} details={details} />
        <TimeTakenModal show={showModal} details={details} />
        <main className={classForBlurContainer}>
          <Header onClick={handleChangeTheme} theme={theme} />
          <MainSection />
        </main>
        <Error />
      </div>
    </ModalContext.Provider >
  );
}

export default App;
