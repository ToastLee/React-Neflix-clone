import React, { useEffect } from 'react'

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      console.log('ref', ref.current);
      //모달 안을 클릭하는게 확인 되면 창을 유지하기
      if(!ref.current || ref.current.contains(event.target)) {
        return;
      }
      //handler에 () => {setModalOpen(false) 콜백하여 창 닫기
      handler()
    };

    document.addEventListener("mousedown", listener)
    document.addEventListener("touchstart", listener)
    return() => {
      //컴포넌트 언 마운트시 클리어
      document.addEventListener("mousedown", listener)
      document.addEventListener("touchstart", listener)

    };
  }, [ref, handler]);
  return (
    <div>useOnClickOutside</div>
  )
}

export default useOnClickOutside