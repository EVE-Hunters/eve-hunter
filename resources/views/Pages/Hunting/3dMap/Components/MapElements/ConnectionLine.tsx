import React, { HTMLAttributes } from 'react'
import { extend, useFrame } from '@react-three/fiber'
import {
  MeshLine,
  MeshLineMaterial,
  MeshLineGeometry,
} from '@lume/three-meshline'
import { Connection } from '../../../../../../scripts/types'
import { useMapStore } from '../../../../../../scripts/Stores/MapStore'
import { Vector3, Vector2 } from 'three'
import { MathUtils } from 'three'
import { useThree } from '@react-three/fiber'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useSystemIsInRoute } from '../../../hooks'

interface ConnectionLineProps extends React.PropsWithChildren {
  connection: Connection
}

extend({ MeshLine, MeshLineMaterial, MeshLineGeometry })

const rand = MathUtils.randFloatSpread

const ConnectionLine: React.FC<ConnectionLineProps> = ({
  connection,
  ...props
}) => {
  const { size } = useThree()

  const line = useRef<MeshLine>()

  const inPath = useSystemIsInRoute([
    connection.system1.system_id,
    connection.system2.system_id,
  ])

  const carray = [connection.system1, connection.system2]

  const points = carray.map((x) => new Vector3(x.x, x.y, x.z))

  useFrame((state, delta) => {
    if (line.current) {
      if (inPath) {
        line.current.material.dashOffset -= (delta * 0.6) / 10
      } else {
        line.current.material.dashOffset = 0
      }
    }
  })

  return (
    <>
      {/* @ts-ignore */}
      <meshLine ref={line}>
        {/* @ts-ignore */}
        <meshLineGeometry points={points} />
        {/* @ts-ignore */}
        <meshLineMaterial
          transparent
          color={inPath ? 'cyan' : 'yellow'}
          resolution={new Vector2(size.width, size.height)}
          lineWidth={inPath ? 0.04 : 0.02}
          dashArray={inPath ? 0.07 : 0}
          dashRatio={inPath ? 0.3 : 0}
        />
        {/* @ts-ignore */}
      </meshLine>
    </>
  )
}
export default ConnectionLine
