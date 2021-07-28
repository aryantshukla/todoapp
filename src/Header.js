import './App.css';
import moon from './moon.png'
import sun from './sun.png'

export const Header = () => {
  return (
    <div className="headerContainer">
      <header className="logoContainer">
        <h1 className="logo">MISTIFY...</h1>
      </header>
      <img src={moon} className="themePic" alt="select theme" />
    </div>
  )
}