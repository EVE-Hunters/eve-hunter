import { SYSTEM_PROPS } from '@mantine/core/lib/Box/style-system-props/system-props/system-props'
import { Instance, Instances, Line } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { MeshLine, MeshLineMaterial } from 'three.meshline'
import React, { HTMLAttributes, useEffect, useRef } from 'react'
import { InstancedBufferGeometry, Line3, Vector3 } from 'three'
import { useHuntingStore, useMapStore } from '../../../../../../scripts/Stores'

extend({ MeshLine, MeshLineMaterial })

const RenderInstanceConnetions = () => {
  const systems = useMapStore((state) => state.systems)
  const connections = useMapStore((state) => state.connections)
  const range = useHuntingStore((state) => state.huntingRange)
  const highlightedRoute = useMapStore((state) => state.highlightedRoute)

  const isInPath = (s1, s2) => {
    const systems = [s1, s2]
    return (
      highlightedRoute?.filter((x) => systems.includes(x.data.system_id))
        .length == 2
    )
  }

  return (
    <>
      {connections.map((c) => {
        const inPath = isInPath(c.system1.system_id, c.system2.system_id)
        return (
          <mesh
            key={`${c.system1.system_id}-${c.system2.system_id}-${c.jumps}`}
          >
            <meshLine
              attach="geometry"
              points={[
                [c.system1.x, c.system1.y, c.system1.z],
                [c.system2.x, c.system2.y, c.system2.z],
              ]}
            />
            <meshLineMaterial
              attach="material"
              color={inPath ? 'cyan' : 'green'}
              lineWidth={inPath ? 3 : 1}
            />
          </mesh>
        )
      })}
    </>
  )
}
