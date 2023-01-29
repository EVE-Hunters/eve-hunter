import { Line } from '@react-three/drei'
import React from 'react'

import { useHuntingStore, useMapStore } from '../../../../../../scripts/Stores'
import ConnectionLine from './ConnectionLine'

interface RenderConnectionsProps extends React.PropsWithChildren {}

const RenderConnections: React.FC<RenderConnectionsProps> = ({ ...props }) => {
  const connections = useMapStore((state) => state.connections)
  const range = useHuntingStore((state) => state.huntingRange)
  const highlightedRoute = useMapStore((state) => state.highlightedRoute)

  const isInPath = (system1: number, system2: number) => {
    const systems = [system1, system2]
    return (
      highlightedRoute?.filter((x) => systems.includes(x.data.system_id))
        .length == 2
    )
  }

  return (
    <>
      {connections
        .filter((x) => x.system2.jumps! <= range)
        .map((c, i) => {
          const inPath = isInPath(c.system1.system_id, c.system2.system_id)
          return (
            <Line
              key={`${c.system1.system_id}-${c.system2.system_id}-${c.jumps}`}
              points={[
                [c.system1.x, c.system1.y, c.system1.z],
                [c.system2.x, c.system2.y, c.system2.z],
              ]}
              color={inPath ? 'cyan' : 'green'}
              lineWidth={inPath ? 3 : 1}
            />
          )
        })}
    </>
  )
}

const RenderInstanceConnetions: React.FC = () => {
  const connections = useMapStore((state) => state.connections)
  const range = useHuntingStore((state) => state.huntingRange)

  return (
    <>
      {connections.map((c) => {
        return (
          <ConnectionLine
            connection={c}
            key={`${c.system1.system_id}-${c.system2.system_id}-${c.jumps}`}
          />
        )
      })}
    </>
  )
}
export default RenderInstanceConnetions
