import { useState } from "react";
import style from "./App.module.css";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Lessons } from "./components/Lessons/Lessons";
import svg from "./assets/sb.svg";
import { Header } from "./components/Header/Header";
import { list } from "./system";
import { Canvas } from "./components/Canvas/Canvas";
import { ScreenOne } from "./components/ScreenOne/ScreenOne";
function App() {
  let [lessons, setLesson] = useState(list);
  let [isSidebar, setIsSidebar] = useState(false);
  function setActive(id) {
    setLesson(
      lessons.map((l) => {
        if (l.id === id) l.isOpened = true;
        else l.isOpened = false;
        return l;
      })
    );
  }
  return (
    // <div className={style.root}>
    //   {isSidebar && <Sidebar lessons={lessons} toggler={setActive} />}
    // <div className={style.container}>
    //   <button className={`${isSidebar ? style.open : ''} ${style.btn}`}
    //     onClick={() => {
    //       setIsSidebar(!isSidebar);
    //     }}
    //   >
    //     <img src={svg} alt="" style={{ fill: "blue" }} />
    //   </button>
    //   <Header lessons={lessons}/>
    //   <Lessons lessons={lessons} />
    // </div>
    // </div>
    <div>
      <ScreenOne lessons={lessons}/>
    </div>
  );
}

export default App;
