import React from 'react';
import style from './App.module.css';
import AppHeader from '../app-header/app-header.jsx';
import BurgerScreen from '../burger-screen/burger-screen.jsx'

class App extends React.Component {

  state = {selectedScreen: 'Конструктор'}

  onHeaderItemClick = (x) => {
    this.setState({...this.state, selectedScreen: x})
  }


  render = () => {return (
    <>
      <AppHeader onHeaderItemClick={this.onHeaderItemClick} selectedScreen={this.state.selectedScreen} />
      {this.state.selectedScreen === 'Конструктор' ? <BurgerScreen container_css={style.main}/> : null}
      <footer className={style.footer}></footer>
    </>
  )
  }
}

export default App;
