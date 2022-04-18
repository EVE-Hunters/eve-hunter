import React, {useState} from 'react';
import NavItem from "../NavItem/NavItem";
import { HiHome } from '../../components/Icons/HeroIcons/HiHome';
import { HiUser } from '../../components/Icons/HeroIcons/HiUser';
import { HiLocationMarker } from '../../components/Icons/HeroIcons/HiLocationMarker';
import { HiLogout } from '../../components/Icons/HeroIcons/HiLogout';
import {useAuth} from "../../hooks/useAuth";
import UserDisplay from "../../components/UserDisplay";
import ChannelSelector from "../../components/ChannelSelector";
import HunterSelector from '../../components/HunterSelector/HunterSelector';


const Sidebar: React.FC = () => {
    const auth = useAuth()

    const [isOpen, setIsOpen] = useState<boolean>(true);

    if (!auth?.isAuthenticated) return null

    return (
        <div className="w-64 bg-gray-700 h-full flex flex-col">

            <div className="py-2 my-2">
               <UserDisplay avatarOnly={!isOpen} />
            </div>

            <div className="p-2 my-1">
                <div className="text-white">Channel</div>
                <ChannelSelector/>
            </div>

            <div className="p-2 my-1">
                <div className="text-white">Hunters</div>
                 <HunterSelector/>
            </div>

            <hr/>

            <div className="px-2 flex h-full flex-col py-3">

                <NavItem title="Home" icon={<HiHome className="w-4 h-4" />} to="/" />

                <NavItem title="Account" icon={<HiUser className="w-4 h-4" />} to="/account" />

                <NavItem title="Hunting" icon={<HiLocationMarker className="w-4 h-4" />} to="/hunting" />

                <div className="mt-auto"></div>

                <NavItem title="Logout" icon={<HiLogout className="w-4 h-4" />} to="/logout" href />

            </div>

        </div>
    )
}

export default Sidebar
