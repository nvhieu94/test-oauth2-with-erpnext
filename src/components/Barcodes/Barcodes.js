import React from 'react';
import { useBarcode } from 'react-barcodes';

const Barcodes =(props) => {
  const {value} = props
  const { inputRef } = useBarcode({
    value: value,
    options: {
     // background: '#ccffff',
      width:1,
      height:20,
      margin: 0,
      displayValue:false,
      textMargin: 0,
    }
  });

  return <svg ref={inputRef} />;
};

export default Barcodes;