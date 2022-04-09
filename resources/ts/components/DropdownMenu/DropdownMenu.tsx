import React, {useRef, useState} from 'react';
import {HiChevronDown} from "react-icons/hi";
import {useListenToOutsideClick} from "../../hooks/useListenToOutsideClick";

interface DropdownComponentInterface {
    activator: any
    closeOnSelect?: boolean
}

const DropdownMenu: React.FC<DropdownComponentInterface> = ({activator, children, closeOnSelect= false}) => {
    const ref = useRef<any>()
    const [open, setOpen] = useState<boolean>(false)
    useListenToOutsideClick(() => {
        setOpen(false);
    }, ref)

    const toggleDropdown = () => {
        setOpen(val => !val)
    }

    const onItemSelect = () => {
        closeOnSelect && toggleDropdown()
    }

    return (
        <div className="relative" ref={ref}>
            {/* Activator */}
            <div className="" onClick={toggleDropdown}>
                {activator}
            </div>
            {/* Dropdown */}
            { open && <div className="absolute mt-1 rounded shadow overflow-hidden" onClick={onItemSelect}>
                {children}
            </div>}
        </div>
    )
}

export default DropdownMenu
