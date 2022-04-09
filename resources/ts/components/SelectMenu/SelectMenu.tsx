import React, {useRef, useState} from 'react';
import {useListenToOutsideClick} from "../../hooks/useListenToOutsideClick";

interface SelectMenuInterface {
    activator: any
}

const SelectMenu: React.FC<SelectMenuInterface> = ({children,activator}) => {
    const ref = useRef<any>()
    const [open, setOpen] = useState<boolean>(false)
    useListenToOutsideClick(() => {
        setOpen(false);
    }, ref)

    const toggleDropdown = () => {
        setOpen(val => !val)
    }

    return (
        <div className="relative w-full" ref={ref}>
            {/* Activator */}
            <div className="w-full" onClick={toggleDropdown}>
                {activator}
            </div>
            {/* Dropdown */}
            {open && <div className="absolute w-full mt-1 rounded shadow overflow-hidden">
                {children}
            </div>}
        </div>
    )
}

export default SelectMenu
