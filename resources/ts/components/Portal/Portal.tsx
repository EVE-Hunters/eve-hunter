import React, {useEffect, useRef} from 'react';
import ReactDOM from "react-dom";
import {Html} from "@react-three/drei";

interface PortalInterface {
    portal?: string,
}

const Portal: React.FC<PortalInterface> = ({portal = 'portal', children}) => {

    const target = useRef<HTMLElement|null>(null)


    useEffect(() => {
        let container = document.getElementById(portal)
        if(!container){
            container = document.createElement('div')
            container.setAttribute('id', portal)
            document.body.appendChild(container)
        }

        if(target.current){
            container.appendChild(target.current)
        }

        return () => {
            target.current?.remove();
            if(container?.childNodes.length === 0){
                container?.remove();
            }
        }
    }, [portal])


    if(!target.current){
        target.current = document.createElement('div');
    }

    return ReactDOM.createPortal(
        <>
            {children}
        </>,
        target.current
    )
}

export default Portal
