import { Instance, Instances, meshBounds } from '@react-three/drei'
import React, {
  HTMLAttributes,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react'
import {
  BufferGeometry,
  SphereBufferGeometry,
  MeshStandardMaterial,
  InstancedMesh,
  Material,
  Object3D,
  Color,
} from 'three'
import {
  useHuntingStore,
  useMapStore,
  useSdeStore,
} from '../../../../../../scripts/Stores'
import SolarSystemInstance from './SolarSystemInstance'
import SolarsystemSphere from './SolarSystemItem'

interface RenderStarsProps extends React.PropsWithChildren {}

const RenderStars: React.FC<RenderStarsProps> = ({ ...props }) => {
  const systems = useMapStore((state) => state.systems)
  const range = useHuntingStore((state) => state.huntingRange)

  return (
    <>
      {systems
        .filter((x) => x.jumps! <= range)
        .map((s, i) => {
          return (
            <SolarsystemSphere
              system={s}
              key={s.system_id}
              position={[s.x, s.y, s.z]}
            />
          )
        })}
    </>
  )
}

const InstanceRender: React.FC = () => {
  const systems = useMapStore((state) => state.systems)
  //const systems = useSdeStore((state) => state.SolarSystems)
  const range = useHuntingStore((state) => state.huntingRange)

  return (
    <Instances>
      <sphereBufferGeometry
        args={[1, 32, 32]}
        attach="geometry"
      ></sphereBufferGeometry>
      <meshStandardMaterial color="#cacbcc" fog={false} transparent={false} />
      <group position={[0, 0, 0]}>
        {systems.map((system) => {
          return <SolarSystemInstance key={system.system_id} system={system} />
        })}
      </group>
    </Instances>
  )
}

export default InstanceRender
