import React from 'react';
import style from './burger-ingredients.module.css';
import {  } from '@ya.praktikum/react-developer-burger-ui-components';

import data from '../../utils/data.js'
import GroupOfIngredients from '../group-of-ingredients/group-of-ingredients.jsx'



class BurgerIngredients extends React.Component {
    constructor(props) {
      super(props);
      this.state = {selectedTab: 'Булки'}
      this.userIsScrolling = false
      this.dataFiltered = {'Булки': data.filter((x) => x.type === 'bun'), 
                            'Соусы': data.filter((x) => x.type === 'sauce'),
                            'Начинки': data.filter((x) => x.type === 'main')}
      this.dataIds = {'Булки': 'bun', 'Соусы': 'sauce', 'Начинки': 'main'}
      this.tabsVisibility = [false, false, false]
    }


    onTabNameClick = (x) => {
      this.userIsScrolling = true
      document.getElementById(this.dataIds[x] + '_header').scrollIntoView()
      this.setState({...this.state, selectedTab: x})
      setTimeout(() => this.userIsScrolling = false, 50)
      // без таймаута IntersectionObserver среагирует на уехавшие заголовки
    }

    onTabScrolled = (entries) => {
      entries.forEach(entry => {
        this.tabsVisibility[Object.keys(this.dataIds).indexOf(entry.target.dataset.id)] = entry.isIntersecting
      })
      const newSelectedTab = Object.keys(this.dataIds)[this.tabsVisibility.indexOf(true)]
      if (newSelectedTab !== this.state.selectedTab && !this.userIsScrolling) {
        this.setState({...this.state, selectedTab: newSelectedTab})
      }
    }

    componentDidMount = () => {
      let options = {
        root: document.querySelector(".ingredients_area"), rootMargin: "0px", threshold: 0.0001,
      };
      this.observer = new IntersectionObserver(this.onTabScrolled, options);
      for (let x of Object.values(this.dataIds)) {
        this.observer.observe(document.getElementById(x + '_data'));
      }
    }

    componentWillUnmount = () => {
      for (let x of Object.values(this.dataIds)) {
        this.observer.unobserve(document.getElementById(x + '_data'));
      }
    }

    render = () => {
      let tabClass

      return (

        <section className={`${style.ingredientsArea} ingredients_area`}>
          <h2 className={'text text_type_main-large mt-10'}>Соберите бургер</h2>

          <nav className={'mt-5'}>
            <ul className={style.tabs}>
              {Object.keys(this.dataFiltered).map((x, idx) => {
                tabClass = this.state.selectedTab === x ? style.activeTab : `${style.inactiveTab} text_color_inactive`
                return <li key={idx} onClick={this.onTabNameClick.bind(this, x)} className={"text text_type_main-default " + tabClass }>{x}</li>
              })}
            </ul>
          </nav>
          
          <section className={`${style.ingredients} mt-10 scrollable`}>
            {Object.keys(this.dataFiltered).map((x, idx) => <GroupOfIngredients key={idx} title={x} data={this.dataFiltered[x]} tabId={this.dataIds[x]} />)}
          </section>

        </section>
    )
    }
}

export default BurgerIngredients;