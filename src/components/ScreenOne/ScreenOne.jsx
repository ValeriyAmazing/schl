import { Canvas } from "../Canvas/Canvas"
import { Header } from "../Header/Header"
import style from './ScreenOne.module.css'

function ScreenOne({lessons}){
    return (
        <div >
            <div className={style.title}>Невьебительный текст</div>
             <Header lessons={lessons} />
               <Canvas/>
        </div>
    )
}
export { ScreenOne }