import {Ref, useEffect} from "react";


export const useListenToOutsideClick = (callback: Function, ref: any) => {

    useEffect(() => {
        function handleOutsideClick(event: any){
            if(ref.current && !ref.current.contains(event.target)){
                callback(event);
            }
        }

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
    }, [ref])
}
