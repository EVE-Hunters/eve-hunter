import { valueGetters } from '@mantine/core/lib/Box/style-system-props/value-getters/value-getters'
import { StaticCopyUsage } from 'three'
import dayjs from '../../../../scripts/dayjs'
import { useMapStore } from '../../../../scripts/Stores'
import { useSystemStatistics } from '../../../../scripts/Stores/StatisticsStore'
import { MapStatisticTypes } from '../../../../scripts/types'

type StatsReturn = {
  [index in MapStatisticTypes]: number
}

export const useSystemItemStatistics = (system_id: number) => {
  const statistic = useMapStore((state) => state.activeStatistic)
  const kills = useSystemStatistics((state) =>
    state.kills.filter((x) => x.system_id == system_id)
  )
  const jumps = useSystemStatistics((state) =>
    state.jumps.filter((x) => x.system_id == system_id)
  )

  let statsObj: StatsReturn = {
    npc1h: 0,
    npc24h: 0,
    delta: 0,
    podKills: 0,
    shipKills: 0,
    jumps: 0,
  }

  statsObj['npc1h'] =
    kills
      .filter((x) =>
        dayjs(x.created_at).isAfter(dayjs.utc().subtract(1, 'hour'))
      )
      .pop()?.npc_kills ?? 0

  statsObj['npc24h'] = kills
    .filter((x) =>
      dayjs(x.created_at).isAfter(dayjs.utc().subtract(24, 'hours'))
    )
    .reduce((acc, val) => {
      return acc + val.npc_kills
    }, 0)

  statsObj['podKills'] =
    kills
      .filter((x) =>
        dayjs(x.created_at).isAfter(dayjs.utc().subtract(1, 'hour'))
      )
      .pop()?.pod_kills ?? 0

  statsObj['shipKills'] =
    kills
      .filter((x) =>
        dayjs(x.created_at).isAfter(dayjs.utc().subtract(1, 'hour'))
      )
      .pop()?.ship_kills ?? 0

  statsObj['jumps'] =
    jumps
      .filter((x) =>
        dayjs(x.created_at).isAfter(dayjs.utc().subtract(1, 'hour'))
      )
      .pop()?.ship_jumps ?? 0

  //calcualte delta
  const previousHour =
    kills
      .filter((x) => {
        const statDate = dayjs(x.created_at)
        const lowerThreshhold = dayjs.utc().subtract(2, 'hour')
        const upperThreshold = dayjs.utc().subtract(1, 'hour')
        return (
          statDate.isAfter(lowerThreshhold) && statDate.isBefore(upperThreshold)
        )
      })
      .pop()?.npc_kills ?? 0
  const currentHour =
    kills
      .filter((x) => {
        const statDate = dayjs(x.created_at)
        const lowerThreshhold = dayjs.utc().subtract(1, 'hour')
        const upperThreshold = dayjs.utc()
        return (
          statDate.isAfter(lowerThreshhold) && statDate.isBefore(upperThreshold)
        )
      })
      .pop()?.npc_kills ?? 0
  statsObj['delta'] = currentHour - previousHour

  return statsObj
}
