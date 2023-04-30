import React from 'react';
import style from './app.module.css';
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
      {this.state.selectedScreen === 'Конструктор' ? <BurgerScreen containerCss={style.main}/> : null}
    </>
  )
  }
}

export default App;
