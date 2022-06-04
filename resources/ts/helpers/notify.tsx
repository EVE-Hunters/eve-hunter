import React from 'react';
import toast, {ToastPosition} from 'react-hot-toast';
import { HiXCircle } from '../components/Icons/HeroIcons/HiXCircle';

type NotificationType = "error" | "info" | "success";
type NotificationPart = string | JSX.Element | null;

interface NotificationSettings {
    type?: NotificationType
    position?: ToastPosition
    icon?: JSX.Element
}

const defaultSettings: NotificationSettings = {
    type: "success",
    position: "top-right",
}

let _notification_id = 0;

const wrapper_styles = "flex flex-row items-center justify-between w-96 px-2 py-4 shadow-2xl hover:shadow-none transform-gpu translate-y-0 hover:translate-y-1 rounded-xl relative transition-all duration-500 ease-in-out"
const icon_wrapper = "text-xl"
const content_wrapper = "flex flex-col items-start justify-center ml-4 cursor-default"
const content_header =  "text-base font-semibold leading-none tracking-wider"
const content_content = "text-sm mt-2 leading-relaxed tracking-wider"
const close_icon = "absolute top-2 right-2 cursor-pointer text-lg"

const notify = (title: NotificationPart, message:NotificationPart = null, settings: NotificationSettings = defaultSettings) => {
    _notification_id++;
    let _settings = Object.assign({},defaultSettings, settings);

    let background_color = "bg-gray-900";
    let text_color = "text-white";

    switch(_settings.type){
        case "error":
            background_color = "bg-red-700";
            text_color = "text-red-100";
            break;
        case "info":
            background_color = "bg-teal-700";
            text_color = "text-teal-100";
            break;
        case "success":
            background_color = "bg-green-700";
            text_color = "text-green-100";
    }

    toast.custom(
        (t) => (
                <div className={`${wrapper_styles} ${background_color} ${text_color} ${t.visible ? "top-0":"-top-96"}`}>
                    { _settings.icon == null ? null : (
                        <div className={`${icon_wrapper}`}>
                            { _settings.icon }
                        </div>
                    )}
                    <div className={`${content_wrapper}`}>
                        <h1 className={`${content_header}`}>{title}</h1>
                        { message == null ? null : (<div className={`${content_content}`}>{message}</div>)}
                    </div>

                    <div className={`${close_icon}`} onClick={()=>toast.dismiss(t.id)}>
                        <HiXCircle />
                    </div>

                </div>
            ),

        {id: _notification_id.toString(), position: _settings.position}
    )

}

export default notify
