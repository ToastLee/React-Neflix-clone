import React, { useEffect, useState } from 'react'
import "./Nav.css"

export default function Nav() {
  
  //스크롤 시에 NavBar 색깔 변경하기
  const [show, setShow] = useState(false);
  
  useEffect(()=> {
    window.addEventListener("scroll", () => {
      if(window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
    return() => {
      window.removeEventListener("scroll", () => {});
    } 
  }, []);

  return (
    <nav className={`nav ${show && "nav_black"}`}>
      <img
        alt='Netflix logo'
        src='https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg'
        className='nav__logo'
        //이미지를 클릭하면 다시 로딩 하게끔
        onClick={() => window.location.reload()}
      
      />
      <img
        alt='User logged'
        src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
        className='nav__avatar'  
      />
    </nav>
  );
};