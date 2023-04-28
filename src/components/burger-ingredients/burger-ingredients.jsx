import React from 'react';
import style from './burger-ingredients.module.css';
import {  } from '@ya.praktikum/react-developer-burger-ui-components';

import data from '../../utils/data.js'
import GroupOfIngredients from '../group-of-ingredients/group-of-ingredients.jsx'



class BurgerIngredients extends React.Component {
    constructor(props) {
      super(props);
      this.state = {selectedTab: 'Булки'}
      this.user_is_scrolling = false
      this.data_filtered = {'Булки': data.filter((x) => x.type === 'bun'), 
                            'Соусы': data.filter((x) => x.type === 'sauce'),
                            'Начинки': data.filter((x) => x.type === 'main')}
      this.data_ids = {'Булки': 'bun', 'Соусы': 'sauce', 'Начинки': 'main'}
      this.tabs_visibility = [false, false, false]
    }


    onTabNameClick = (x) => {
      this.user_is_scrolling = true
      document.getElementById(this.data_ids[x] + '_header').scrollIntoView()
      this.setState({...this.state, selectedTab: x})
      setTimeout(() => this.user_is_scrolling = false, 50)
      // без таймаута IntersectionObserver среагирует на уехавшие заголовки
    }

    onTabScrolled = (entries) => {
      entries.forEach(entry => {
        this.tabs_visibility[Object.keys(this.data_ids).indexOf(entry.target.dataset.id)] = entry.isIntersecting
      })
      const newSelectedTab = Object.keys(this.data_ids)[this.tabs_visibility.indexOf(true)]
      if (newSelectedTab !== this.state.selectedTab && !this.user_is_scrolling) {
        this.setState({...this.state, selectedTab: newSelectedTab})
      }
    }

    componentDidMount = () => {
      let options = {
        root: document.querySelector(".ingredients_area"), rootMargin: "0px", threshold: 0.0001,
      };
      this.observer = new IntersectionObserver(this.onTabScrolled, options);
      for (let x of Object.values(this.data_ids)) {
        this.observer.observe(document.getElementById(x + '_data'));
      }
    }

    componentWillUnmount = () => {
      for (let x of Object.values(this.data_ids)) {
        this.observer.unobserve(document.getElementById(x + '_data'));
      }
    }

    render = () => {
      let tab_class

      return (

        <section className={`${style.ingredients_area} ingredients_area`}>
          <h2 className={'text text_type_main-large mt-10'}>Соберите бургер</h2>

          <nav className={'mt-5'}>
            <ul className={style.tabs}>
              {Object.keys(this.data_filtered).map((x, idx) => {
                tab_class = this.state.selectedTab === x ? style.activeTab : `${style.inactiveTab} text_color_inactive`
                return <li key={idx} onClick={this.onTabNameClick.bind(this, x)} className={"text text_type_main-default " + tab_class }>{x}</li>
              })}
            </ul>
          </nav>
          
          <section className={`${style.ingredients} mt-10 scrollable`}>
            {Object.keys(this.data_filtered).map((x, idx) => <GroupOfIngredients key={idx} title={x} data={this.data_filtered[x]} tabId={this.data_ids[x]} />)}
          </section>

        </section>
    )
    }
}

export default BurgerIngredients;