import React from 'react';
import { getCertificate } from '../services/testAPI';


async function doTest() {
  
  const response = await getCertificate();
  console.log("Yeh!", response);
}
const Test = () => {
  return (
    <div>
      <button onClick={doTest}>Hello</button>
    </div>
  );
}

export default Test;


