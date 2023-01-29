import React, { HTMLAttributes } from 'react'
import { BufferGeometry, Mesh } from 'three'
import { useMapStore } from '../../../../../../scripts/Stores'
import { useHuntingStore } from '../../../../../../scripts/Stores/HuntingStore'

interface RangeSphereProps extends React.PropsWithChildren {}

const RangeSphere = React.forwardRef<Mesh<BufferGeometry>, RangeSphereProps>(
  function (inProps, ref) {
    const showRange = useMapStore((state) => state.showRangeSphere)
    const huntingSystemId = useHuntingStore((state) => state.huntingSystemId)
    const systems = useMapStore((state) => state.systems)

    const hunting = systems.find((x) => x.system_id == huntingSystemId)

    if (!showRange) {
      return null
    }

    return (
      <mesh
        {...inProps}
        ref={ref}
        scale={1}
        position={[hunting?.x ?? 0, hunting?.y ?? 0, hunting?.z ?? 0]}
      >
        <sphereGeometry args={[8, 30, 8]} />
        <meshStandardMaterial color="blue" wireframe={true} />
      </mesh>
    )
  }
)
export default RangeSphere
