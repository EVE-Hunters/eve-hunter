import { OrbitControls } from '@react-three/drei'
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import React, { MutableRefObject, useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Coordinates, SolarSystem } from '../../../../../scripts/types'
import { Vector3, Vector3Tuple } from 'three'
import {
  useHuntingStore,
  useMapStore,
  useSdeStore,
} from '../../../../../scripts/Stores'
import { usePrevious } from '@mantine/hooks'

interface ControlsProviderProps extends React.PropsWithChildren {}

const ControlsContext = React.createContext<{
  controls: MutableRefObject<OrbitControlsImpl | null>
  setCoordinates: (camera: Coordinates, center: Coordinates) => void
  currentCenter: () => Coordinates
} | null>(null)

const ControlsProvider: React.FC<ControlsProviderProps> = ({ ...props }) => {
  const SolarSystems = useSdeStore((state) => state.SolarSystems)
  const huntingSystemId = useHuntingStore((state) => state.huntingSystemId)
  const systems = useMapStore((state) => state.systems)
  const previousSystemId = usePrevious<number | null>(huntingSystemId)
  const controls = useRef<OrbitControlsImpl>(null)
  const camera = useThree((state) => state.camera)

  const setCoordinates = (position: Coordinates, center: Coordinates) => {
    camera.position.x = position.x
    camera.position.y = position.y
    camera.position.z = position.z
    //controls.current.target.set
    setCameraTarget([center.x, center.y, center.z])
    camera.updateProjectionMatrix()
  }

  const setCameraTarget = (target: Vector3Tuple) => {
    if (controls.current == null) return
  }

  const currentCenter = () => {
    return {
      x: controls.current?.target.x ?? 0,
      y: controls.current?.target.y ?? 0,
      z: controls.current?.target.z ?? 0,
    }
  }

  const resetCamera = () => {
    camera.position.set(1, 1, 1)
    camera.lookAt(0, 0, 0)
    camera.updateProjectionMatrix()
  }

  useEffect(() => {
    const huntingSystem = SolarSystems.find(
      (x) => x.system_id == huntingSystemId
    )

    const previousSystem = SolarSystems.find(
      (x) => x.system_id == previousSystemId
    )
    const oldSystemVec = new Vector3(
      previousSystem?.x ?? 0,
      previousSystem?.y ?? 0,
      previousSystem?.z ?? 0
    )
    const newsystemVec = new Vector3(
      huntingSystem?.x ?? 0,
      huntingSystem?.y ?? 0,
      huntingSystem?.z ?? 0
    )
    const positionDifference = oldSystemVec.subVectors(
      oldSystemVec,
      newsystemVec
    )

    const newCamperPos = camera.position.subVectors(
      camera.position,
      positionDifference
    )

    controls.current!.target.set(
      huntingSystem?.x ?? 0,
      huntingSystem?.y ?? 0,
      huntingSystem?.z ?? 0
    )
    camera.lookAt(newsystemVec)
    camera.position.set(newCamperPos.x, newCamperPos.y, newCamperPos.z)
    controls.current?.update()
  }, [huntingSystemId])

  return (
    <ControlsContext.Provider
      value={{ controls, setCoordinates, currentCenter }}
    >
      <OrbitControls
        ref={controls}
        makeDefault
        enablePan={true}
        enableZoom={true}
        zoomSpeed={3}
        enableRotate={true}
      />
      {props.children}
    </ControlsContext.Provider>
  )
}
export default ControlsProvider
