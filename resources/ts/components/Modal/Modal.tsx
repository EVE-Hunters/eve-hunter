import React, {useState} from 'react';
import Portal from "../Portal/Portal";
import { HiPlus } from '../Icons/HeroIcons/HiPlus';


interface ModalInterface {
    activator: any
    actions?: any
}

const Modal: React.FC<ModalInterface> = ({activator, actions, children}) => {

    const [isOpen, setIsOpen] = useState<Boolean>(false);

    return (
        <>
            <div onClick={() => setIsOpen(true)}>
                {activator}
            </div>
            {isOpen && <Portal>
                <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog"
                     aria-modal="true">
                    <div
                        className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        {/*<!--
                      Background overlay, show/hide based on modal state.

                      Entering: "ease-out duration-300"
                        From: "opacity-0"
                        To: "opacity-100"
                      Leaving: "ease-in duration-200"
                        From: "opacity-100"
                        To: "opacity-0"
                    -->*/}
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                             aria-hidden="true"></div>

                        {/*<!-- This element is to trick the browser into centering the modal contents. -->*/}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"
                              aria-hidden="true">&#8203;</span>

                        {/*<!--
                      Modal panel, show/hide based on modal state.

                      Entering: "ease-out duration-300"
                        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        To: "opacity-100 translate-y-0 sm:scale-100"
                      Leaving: "ease-in duration-200"
                        From: "opacity-100 translate-y-0 sm:scale-100"
                        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    -->*/}

                        <div
                            className="relative inline-block align-bottom rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div
                                onClick={() => setIsOpen(false)}
                                className="absolute z-10 bg-white top-0 right-0 transform translate-x-1/3 -translate-y-1/3 rounded-full w-6 h-6 shadow-md flex items-center justify-center cursor-pointer">
                                <HiPlus className="transform rotate-45" />
                            </div>
                            <div className="overflow-hidden rounded-lg">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    {children}
                                </div>
                                {actions && <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" onClick={() => setIsOpen(false)}>
                                    {actions}
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </Portal>}
        </>
    )
}

export default Modal
