import style from './burger-content.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';


const BurgerContent = ({ extraClass, data }) => (
    <ul className={`${style.contentContainer} scrollable pr-4`}>
        {data.map((elem) => (
            <li key={elem['_id']} className={style.anElement}>
                <DragIcon type="primary" />
                <ConstructorElement text={elem["name"]} price={elem["price"]} thumbnail={elem["image"]} extraClass={extraClass}/>
            </li>
        ))}
    </ul>
)


export default BurgerContent;