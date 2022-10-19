import React, {FC, ReactNode} from "react"
import style from "./MyBytton.module.css"
import {jsx} from "@emotion/react";
import IntrinsicAttributes = jsx.JSX.IntrinsicAttributes;

type propsType = {
    children: ReactNode
    type?: any
    disabled?: boolean
    onClick?: any
}

export const MyButton: FC<propsType> = ({children, ...props}) => {
    return <button className={style.myButton} {...props}>{children}</button>
}
