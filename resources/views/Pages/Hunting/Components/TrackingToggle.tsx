import { Button, Tooltip } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import React, { HTMLAttributes } from 'react'
import { useHuntingStore } from '../../../../scripts/Stores'
import UiSdeProvider, {
  useUiSde,
} from '../../../Providers/UiSdeProvider/UiSdeProvider'

interface TrackingToggleProps extends React.PropsWithChildren {}

const TrackingToggle: React.FC<TrackingToggleProps> = ({ ...props }) => {
  const primaryHunter = useHuntingStore((state) => state.primaryHunter)
  const toggleTracking = useHuntingStore((state) => state.toggleTracking)
  const trackingEnabled = useHuntingStore((state) => state.tracking)

  if (primaryHunter == null) {
    return (
      <Tooltip
        label="Please select a primary hunter to enable tracking"
        withArrow
        width={300}
      >
        <Button color="gray.5" {...props}>
          {trackingEnabled ? 'Tracking Enabled' : 'Tracking Disabled'}
        </Button>
      </Tooltip>
    )
  } else {
    return (
      <Button
        color={trackingEnabled ? 'blue' : 'red'}
        onClick={() => toggleTracking()}
        {...props}
      >
        {trackingEnabled ? 'Tracking Enabled' : 'Tracking Disabled'}
      </Button>
    )
  }
}
export default TrackingToggle
