import style from "./Header.module.css";
function Header({lessons}) {
  let status = lessons.map(e=>{
    if (e.isOpened){
      return e.title
    }
  })[0]
  return <div className={style.header}>
    <h1 className={style.logo}>{status ? status: 'AmazingCoding'}</h1>
  </div>;
}

export { Header };
