import './style.scss';
import { forwardRef, ReactNode } from 'react';


type PropsType = {
    children: ReactNode;
}



const Popover = forwardRef<any, PropsType>((props, ref) => {
    return (
        <div>{props.children}</div>
    )
})

export default Popover;