import BurgerIngredients from './burger-ingredients/burger-ingredients';
import BurgerConstructor from './burger-constructor/burger-constructor';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


const App = () => (
    <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
    </DndProvider>
  )

export default App;

