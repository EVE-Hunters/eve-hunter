import { object } from 'underscore'
import dayjs from '../../../../scripts/dayjs'
import { useHuntingStore, useMapStore } from '../../../../scripts/Stores'
import { useSystemStatistics } from '../../../../scripts/Stores/StatisticsStore'
import { MapStatisticTypes } from '../../../../scripts/types'
import { useSystemItemStatistics } from './useSystemItemStatistics'

export const useSystemStatisticColorIntensity = (
  statistic: number,
  stat?: MapStatisticTypes
) => {
  const activeStatistic = useMapStore((state) => state.activeStatistic)

  const average = useSystemStatistics(
    (state) => state.max[stat ?? activeStatistic]
  )
  let intensity = Math.floor((statistic / average) * 100)
  intensity = intensity > 100 ? 100 : intensity < 0 ? 0 : intensity
  const color = `rgb(190, ${100 - intensity}, 50)`
  return [color, intensity / 100]
}

export const useSystemStatisticsColors = (system_id: number) => {
  const stats = useSystemItemStatistics(system_id)
  const maxes = useSystemStatistics((state) => state.max)
  return Object.keys(stats).reduce((acc, key) => {
    const stat = stats[key]
    const max = maxes[key]
    let intensity = Math.floor((stat / max) * 100)
    intensity = intensity > 100 ? 100 : intensity < 0 ? 0 : intensity
    return {
      ...acc,
      [key]: `rgb(190, ${100 - intensity}, 50)`,
    }
  }, {})
}
