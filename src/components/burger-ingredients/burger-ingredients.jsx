import { useState, useEffect, useRef, useContext } from 'react';
import style from './burger-ingredients.module.css';
import {  } from '@ya.praktikum/react-developer-burger-ui-components';
import { DataContext } from '../../context/context.js';

import GroupOfIngredients from '../group-of-ingredients/group-of-ingredients.jsx'




const BurgerIngredients = () => {
  
  const [selectedTab, setSelectedTab] = useState()
  const [userIsJumping, setUserIsJumping] = useState(false)
  const [dataFiltered, setDataFiltered] = useState({'Булки': [], 'Соусы': [], 'Начинки': []})
  const [tabsVisibility, setTabsVisibility] = useState([false, false, false])
  const [dataIds] = useState({'Булки': 'bun', 'Соусы': 'sauce', 'Начинки': 'main'})
  const ingredientsArea = useRef()
  const data = useContext(DataContext)

  useEffect(() => {
    setDataFiltered({
      'Булки': data.filter((x) => x.type === 'bun'), 
      'Соусы': data.filter((x) => x.type === 'sauce'),
      'Начинки': data.filter((x) => x.type === 'main')
    })
  }, [data.join()])

  const onTabNameClick = (x) => {
    setUserIsJumping(true)
    document.getElementById(dataIds[x] + '_header').scrollIntoView()
    setSelectedTab(x)
    setTimeout(() => setUserIsJumping(false), 100)
    // без таймаута IntersectionObserver среагирует на уехавшие заголовки
  }

  const onTabScrolled = (entries) => {
    entries.forEach(entry => {
      tabsVisibility[Object.keys(dataIds).indexOf(entry.target.dataset.id)] = entry.isIntersecting
    })
    setTabsVisibility(tabsVisibility)
    const newSelectedTab = Object.keys(dataIds)[tabsVisibility.indexOf(true)]
    if (newSelectedTab !== selectedTab && !userIsJumping) {
      setSelectedTab(newSelectedTab)
    }
  }

  useEffect(() => {
    const options = {root: ingredientsArea.current,
                     rootMargin: "0px", 
                     threshold: 0.001}
    const observer = new IntersectionObserver(onTabScrolled, options)
    for (let x of Object.values(dataIds)) {
      const header = document.getElementById(x + '_data')
      header && observer.observe(header)
    }
    return () => {
      for (let x of Object.values(dataIds)) {
        const header = document.getElementById(x + '_data')
        header && observer.unobserve(header)
      }
    }
  }, [])

  let tabClass
  return (
    <section ref={ingredientsArea} className={`${style.ingredientsArea} ingredients_area`}>
      <h2 className={'text text_type_main-large mt-10'}>Соберите бургер</h2>

      <nav className={'mt-5'}>
        <ul className={style.tabs}>
          {Object.keys(dataIds).map((x, idx) => {
            tabClass = selectedTab === x ? style.activeTab : `${style.inactiveTab} text_color_inactive`
            return <li key={idx} 
                       onClick={onTabNameClick.bind(this, x)} 
                       className={"text text_type_main-default " + tabClass}>{x}</li>
          })}
        </ul>
      </nav>
      
      <section className={`${style.ingredients} mt-10 scrollable`}>
        {Object.keys(dataIds).map((x, idx) => <GroupOfIngredients key={idx} 
                                                                  title={x} 
                                                                  data={dataFiltered[x]} 
                                                                  tabId={dataIds[x]} />)}
      </section>
    </section>
  )

}


export default BurgerIngredients;