import { useState, useRef, useMemo } from 'react';
import style from './burger-ingredients.module.css';
import { useSelector } from 'react-redux';
import GroupOfIngredients from '../group-of-ingredients/group-of-ingredients.jsx'




const BurgerIngredients = () => {
  const data = useSelector(store => store.ingredients.ingredients)
  const headerNames = ['Булки', 'Соусы', 'Начинки']
  const headerRefs = [useRef(), useRef(), useRef()]
  const [selectedTab, setSelectedTab] = useState('Булки')
  const areaStart = useRef()
  const areaStartCoords = useMemo(() => areaStart.current && areaStart.current.getBoundingClientRect().bottom, 
                                  [areaStart.current])

  const handleScroll = () => {
    const dist = headerRefs.map(x => x.current.getBoundingClientRect().top - areaStartCoords).map(x => Math.abs(x))
    const newSelectedTab = headerNames[dist.indexOf(Math.min(...dist))]
    if (newSelectedTab !== selectedTab) {
      setSelectedTab(newSelectedTab)
    }
  }

  const onTabNameClick = (x) => {
    headerRefs[headerNames.indexOf(x)].current.scrollIntoView()
    setSelectedTab(x)
  }

  return (
    <section className={`${style.ingredientsArea} ingredients_area`}>
      <h2 className={'text text_type_main-large mt-10'}>Соберите бургер</h2>

      <nav className={'mt-5'} ref={areaStart}>
        <ul className={style.tabs}>
          {headerNames.map((x, idx) => {
            return <li key={idx} 
                       onClick={onTabNameClick.bind(this, x)} 
                       className={"text text_type_main-default " + 
                                  (selectedTab === x 
                                    ? style.activeTab 
                                    : `${style.inactiveTab} text_color_inactive`)}>{x}</li>
          })}
        </ul>
      </nav>
      
      <section className={`${style.ingredients} mt-10 scrollable`} onScroll={handleScroll}>
        {headerNames.map((x, idx) => <GroupOfIngredients key={idx} 
                                                         title={x}
                                                         ref={headerRefs[idx]}
                                                         data={data[x]} />)}
      </section>
    </section>
  )

}


export default BurgerIngredients;