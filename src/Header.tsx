import './App.css';
import moon from './moon.png'
import sun from './sun.png'

import { PropsHeaderType } from './types/types';

export const Header = (props:PropsHeaderType) => {

  return (
    <div className="headerContainer">
      <header className="logoContainer">
        <h1 className="logo">MISTIFY...</h1>
      </header>
      <img src={props.theme === 'light' ? moon : sun} className="themePic" alt="select theme" onClick={props.onClick} />
    </div>
  )
}