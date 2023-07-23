import { useState, useRef, useMemo, FC, LegacyRef, ForwardedRef } from 'react';
import style from './burger-ingredients.module.css';
import { useSelector } from '../../..';
import GroupOfIngredients from '../group-of-ingredients/group-of-ingredients'
import { TIngredientGroup, TStore } from '../../../utils/types';



const BurgerIngredients: FC = () => {
  const getIngredients = (store: TStore) => store.ingredients.ingredients
  const data = useSelector(getIngredients)
  const headerNames: TIngredientGroup[] = ['Булки', 'Соусы', 'Начинки']
  const headerRefs = [useRef<HTMLHeadingElement>(), 
                      useRef<HTMLHeadingElement>(), 
                      useRef<HTMLHeadingElement>()]
  const [selectedTab, setSelectedTab] = useState<TIngredientGroup>('Булки')
  const areaStart = useRef<HTMLElement>()

  const handleScroll = (): void => {
    const areaStartCoords = areaStart.current && areaStart.current.getBoundingClientRect().bottom
    if (headerRefs.some((x) => !x) || !areaStartCoords) {return}
    const dist = headerRefs.map(x => x.current!.getBoundingClientRect().top - areaStartCoords).map(x => Math.abs(x))
    const newSelectedTab = headerNames[dist.indexOf(Math.min(...dist))]
    if (newSelectedTab !== selectedTab) {
      setSelectedTab(newSelectedTab)
    }
  }

  const onTabNameClick = (x: TIngredientGroup): void => {
    headerRefs[headerNames.indexOf(x)].current!.scrollIntoView()
    setSelectedTab(x)
  }

  return (
    <section className={`${style.ingredientsArea} ingredients_area`}>
      <h2 className={'text text_type_main-large mt-10'}>Соберите бургер</h2>

      <nav className={'mt-5'} ref={areaStart as LegacyRef<HTMLElement>}>
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
                                                         ref={headerRefs[idx] as ForwardedRef<HTMLHeadingElement>}
                                                         data={data[x]} />)}
      </section>
    </section>
  )

}


export default BurgerIngredients;