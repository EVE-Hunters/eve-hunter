import React, {ReactNode} from 'react';
import {NavLink} from "react-router-dom";

interface NavItemInterface {
    to: string,
    href?: boolean
    title: string,
    icon: ReactNode,
}

const NavItem: React.FC<NavItemInterface> = ({to, title, icon, href=false}) => {

    const renderLink = () => {
        return (<div
            className="rounded py-2 px-3 hover:bg-gray-300 hover:text-gray-700 bg-gray-500 cursor-pointer shadow my-1 flex space-x-2">

            <div className="flex items-center">
                {icon}
            </div>
            <div className="w-full">
                {title}
            </div>

        </div>)
    }

    const renderNavLink = () => {
        return (<NavLink to={to}>
            {renderLink()}
        </NavLink>)
    }
    const renderHref = () => {
        return (<a href={to ?? '#'}>
            {renderLink()}
        </a>)
    }

    return href ? renderHref() : renderNavLink()

}

export default NavItem
