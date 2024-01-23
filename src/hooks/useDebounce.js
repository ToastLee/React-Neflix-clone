import {useState, useEffect} from 'react'

export const useDebounce =(value, delay) => {
  //디바운스 선언해주기
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(
    () => {
      //디바운스 값을 지연된 후에 올려주기
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)

      //중간에 값이 변경되면 지연 시간을 초기화하여 중복으로 값을 올리지 않게끔
      return () => {
        clearTimeout(handler)
      }
    },
    [value, delay] //값이나 지연 시간이 바뀌면 다시 한 번 호출
  )
  return debouncedValue
}
