import React, {Suspense} from 'react'
import { useNavigate, Outlet } from 'react-router'
import { useAuth } from '../../hooks/useAuth'


const UnauthenticatedLayout: React.FC = ({...props}) => {

    const {isAuthenticated, isInitializing} = useAuth();
    const navigate = useNavigate();

    if(isInitializing){
        return (
            <div className="w-full h-full flex">
                <div className="flex w-full flex-col">
                    {/* Application Header */}
                    <div className="h-8 bg-sky-700 text-sky-100 flex px-4 py-1">
                        <span>Blops Hunter</span>
                    </div>
                    <div className="flex h-full justify-center items-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"/>
                    </div>
                </div>

            </div>
        )
    }

    if(isAuthenticated)
        navigate('/');

    return (
        <div className="w-full h-full flex">
            <div className="flex w-full h-full flex-col">
                {/* Application Header */}
                <div className="h-8 bg-sky-700 text-sky-100 flex px-4 py-1">
                    <span>Blops Hunter</span>
                </div>
                <div className="p-4 h-full overflow-y-auto">
                    <Suspense fallback={null}>
                        <Outlet />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}
export default UnauthenticatedLayout
