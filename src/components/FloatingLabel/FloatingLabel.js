import React from "react";
import {ControlWrapper} from './FloatingLabelStyled'

const FloatingLabel =(props)=>{
   const {label,children} = props;
   return(
       <ControlWrapper>
          {children}
          <label>{label}</label>
       </ControlWrapper>
   )
}

export default FloatingLabel