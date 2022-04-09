import React, {useEffect, useState} from 'react';
import {ChannelFormInterface} from "../../../interfaces/User/ChannelInterface";
import SystemSearch from "../../Map/Controls/SystemSearch";
import {SolarSystemInterface} from "../../../interfaces/Map/MapInterfaces";

interface ChannelFormComponentInterface {
    onChange?: (form: ChannelFormInterface) => void
    value: ChannelFormInterface,
}



const ChannelForm: React.FC<ChannelFormComponentInterface> = ({value, onChange}) => {

    const [name, setName] = useState<string>(value.name ?? '')
    const [ selectedSystem, setSelectedSystem ] = useState<SolarSystemInterface|null>(null)


    useEffect(() => {
      onChange && onChange({
          name,
          staging_system_id: selectedSystem?.system_id ?? 0
      })
    }, [name, selectedSystem])

    return (
        <div className="w-full flex flex-col">
            <div className="mb-2">
                <label htmlFor="name">Channel Name <span className="text-red-600">(required)</span></label>
                <input autoComplete="off"
                       type="text"
                       name="name"
                       value={name}
                       onChange={e => setName(e.target.value)}
                       className="w-full focus:outline-none border rounded px-3 py-1"/>
            </div>

            <div className="mb-2">
                <label>Staging System <span className="text-red-600">(required)</span></label>
                <SystemSearch onSystemSelect={setSelectedSystem} />
            </div>
        </div>
    )
}

export default ChannelForm
