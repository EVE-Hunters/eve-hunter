import dayjs from '../dayjs'

import create from 'zustand'
import { persist } from 'zustand/middleware'
import { JumpStatistics, KillsStatistics, MapStatisticTypes } from '../types'
import { StaticReadUsage } from 'three'

type StatRecord = {
  system_id: number
  date: string
}

type GroupedStats<T> = {
  system_id: number
  stats: T[]
}

type AccumulatedStats = {
  [index in MapStatisticTypes]: number
}

interface StatisticsStore {
  kills: KillsStatistics[]
  jumps: JumpStatistics[]

  statsTs: StatRecord[]

  averages: AccumulatedStats
  max: AccumulatedStats

  calculateAverages: (systems: number[]) => void

  addStats: (
    kills: KillsStatistics[],
    jumps: JumpStatistics[],
    systemId: number[]
  ) => void
}

const trimStaleData = (
  stat: KillsStatistics | JumpStatistics,
  index,
  self: KillsStatistics[] | JumpStatistics[]
) => {
  const recordDate = dayjs(stat.created_at)
  const staleDate = dayjs.utc().subtract(36, 'hours')
  return recordDate.isAfter(staleDate)
}

function UniqueValue<T = any>(value: T, index: number, self: T[]) {
  return self.indexOf(value) == index
}

const filterHour = (x: KillsStatistics | JumpStatistics) => {
  return dayjs(x.created_at).isAfter(dayjs.utc().subtract(1, 'hour'))
}

const filterDay = (x: KillsStatistics | JumpStatistics) => {
  return dayjs(x.created_at).isAfter(dayjs.utc().subtract(24, 'hour'))
}

export const useSystemStatistics = create<StatisticsStore>((set, get) => ({
  kills: [],
  jumps: [],
  statsTs: [],

  averages: {
    jumps: 0,
    npc1h: 0,
    npc24h: 0,
    delta: 0,
    shipKills: 0,
    podKills: 0,
  },

  max: {
    jumps: 0,
    npc1h: 0,
    npc24h: 0,
    delta: 0,
    shipKills: 0,
    podKills: 0,
  },

  calculateAverages: (systems) => {
    const kills = get().kills.filter((x) => systems.includes(x.system_id))
    const jumps = get()
      .jumps.filter((x) => systems.includes(x.system_id))
      .filter((x) =>
        dayjs(x.created_at).isAfter(dayjs.utc().subtract(1, 'hour'))
      )
    //jumps
    const jumpAverage =
      jumps.map((x) => x.ship_jumps).reduce((acc, val) => acc + val, 0) /
      jumps.length
    const maxJumps = Math.max(...jumps.map((x) => x.ship_jumps))
    //1h npc
    const npc1h = kills.filter(filterHour).map((x) => x.npc_kills)
    const npcHourAverage =
      npc1h.reduce((acc, val) => acc + val, 0) / npc1h.length
    const maxNpc1h = Math.max(...npc1h)
    //ship kills
    const shipKills = kills.filter(filterHour).map((x) => x.ship_kills)
    const shipKillsAverage =
      shipKills.reduce((a, x) => a + x, 0) / shipKills.length
    const maxShipKills = Math.max(...shipKills)
    //pod kills
    const podKills = kills.filter(filterHour).map((x) => x.pod_kills)
    const podKillsAverage =
      podKills.reduce((a, x) => a + x, 0) / podKills.length
    const maxPodKills = Math.max(...podKills)
    const npc24h = kills.filter(filterDay).reduce<
      {
        system_id: number
        kills: number[]
      }[]
    >((acc, obj) => {
      //Need to collate the kills in the last 24 hours and group them by system ud
      let currentSystem = acc.find((x) => x.system_id == obj.system_id) ?? {
        system_id: obj.system_id,
        kills: [],
      }
      return [
        ...acc.filter((x) => x.system_id != obj.system_id),
        {
          ...currentSystem,
          kills: [...currentSystem.kills, obj.npc_kills],
        },
      ]
    }, [])
    const npc24HourAverage =
      npc24h
        //we want the sum of each system as an array
        .map((x) => x.kills.reduce((a, x) => a + x, 0))
        //then calculate the average of the array
        .reduce((a, x) => a + x, 0) / npc24h.length

    const maxNpc24h = Math.max(
      ...npc24h.map((x) => x.kills.reduce((a, x) => a + x, 0))
    )
    //npc delta
    //group the kills by system
    const groupedKill = kills.reduce<GroupedStats<KillsStatistics>[]>(
      (acc, item) => {
        const currentSystem = acc.find(
          (a) => a.system_id == item.system_id
        ) ?? {
          system_id: item.system_id,
          stats: [],
        }
        return [
          ...acc.filter((a) => a.system_id != item.system_id),
          {
            ...currentSystem,
            stats: [...currentSystem.stats, item],
          },
        ]
      },
      []
    )
    const detlas = groupedKill.map((item) => {
      const previousHour =
        item.stats
          .filter((x) => {
            const statDate = dayjs(x.created_at)
            const lowerThreshhold = dayjs.utc().subtract(2, 'hour')
            const upperThreshold = dayjs.utc().subtract(1, 'hour')
            return (
              statDate.isAfter(lowerThreshhold) &&
              statDate.isBefore(upperThreshold)
            )
          })
          .pop()?.npc_kills ?? 0
      const currentHour =
        item.stats
          .filter((x) => {
            const statDate = dayjs(x.created_at)
            const lowerThreshhold = dayjs.utc().subtract(1, 'hour')
            const upperThreshold = dayjs.utc()
            return (
              statDate.isAfter(lowerThreshhold) &&
              statDate.isBefore(upperThreshold)
            )
          })
          .pop()?.npc_kills ?? 0
      return {
        system_id: item.system_id,
        delta: currentHour - previousHour,
      }
    })
    const deltaAverage =
      detlas.reduce((acc, val) => acc + val.delta, 0) / detlas.length
    const maxDelta = Math.max(...detlas.map((x) => x.delta))

    set(() => ({
      averages: {
        jumps: Math.floor(jumpAverage),
        npc1h: Math.floor(npcHourAverage),
        npc24h: Math.floor(npc24HourAverage),
        shipKills: Math.floor(shipKillsAverage),
        podKills: Math.floor(podKillsAverage),
        delta: Math.floor(deltaAverage),
      },
      max: {
        jumps: maxJumps,
        npc1h: maxNpc1h,
        npc24h: maxNpc24h,
        shipKills: maxShipKills,
        podKills: maxPodKills,
        delta: maxDelta,
      },
    }))
  },

  addStats: (nKills, nJumps, systemId) =>
    set((state) => {
      //first thing first, get the most recent date for the stored stats
      const maxKillDate = dayjs.max(nKills.map((x) => dayjs(x.created_at)))
      const maxJumpDate = dayjs.max(nJumps.map((x) => dayjs(x.created_at)))

      //lets trim our the any data that may be stale now
      const nonStaleKills = state.kills.filter(trimStaleData)
      const nonStaleJumps = state.jumps.filter(trimStaleData)

      //map the ids
      const nonStaleKillsId = nonStaleKills.map((x) => x.id)
      const notStaleJumpsId = nonStaleJumps.map((x) => x.id)

      //filter new data that is already stored
      const newKillData = nKills.filter((x) => !nonStaleKillsId.includes(x.id))
      const newJumpData = nJumps.filter((x) => !notStaleJumpsId.includes(x.id))

      //consolidate system ids
      const consolidatedSysemId = [
        ...newKillData.map((x) => x.system_id),
        ...newJumpData.map((x) => x.system_id),
      ].filter(UniqueValue)

      const addStatsTs = [...consolidatedSysemId, ...systemId]
        .filter(UniqueValue)
        .map<StatRecord>((id) => ({
          system_id: id,
          date: maxKillDate.isAfter(maxJumpDate)
            ? maxKillDate.toISOString()
            : maxJumpDate.toISOString(),
        }))

      return {
        statsTs: [
          ...state.statsTs.filter(
            (x) => !consolidatedSysemId.includes(x.system_id)
          ),
          ...addStatsTs,
        ],
        kills: [...nonStaleKills, ...newKillData],
        jumps: [...nonStaleJumps, ...newJumpData],
      }
    }),
}))
