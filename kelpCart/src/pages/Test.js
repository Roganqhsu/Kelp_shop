import { current } from '@reduxjs/toolkit';
import React from 'react'
import Cart_test from './cart/Cart_test';
const Test = () => {
  const array1 = [1, 2, 36, 5];

  // 0 + 1 + 2 + 3 + 4
  const initialValue = 0;
  let  Total = array1.reduce(
    function(acc, cur){
      console.log(acc,cur);
      return(acc+cur);
    },0

  );
  const onClickTest = () => {
    console.log(Total);
  }

  // console.log(sumWithInitial);
  return (
    <div >
      <Cart_test />
      <button onClick={() => { onClickTest() }}>test</button>
    </div>
  )
}

export default Test