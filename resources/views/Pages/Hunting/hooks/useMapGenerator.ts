import dayjs from '../../../../scripts/dayjs'
import { usePrevious } from '@mantine/hooks'
import { useCallback, useEffect, useLayoutEffect } from 'react'
import { useSdeStore } from '../../../../scripts/Stores'
import { useHuntingStore } from '../../../../scripts/Stores/HuntingStore'
import { useMapStore } from '../../../../scripts/Stores/MapStore'
import { useSystemStatistics } from '../../../../scripts/Stores/StatisticsStore'
import {
  Connection,
  JumpStatistics,
  KillsStatistics,
  SolarSystem,
  Stargate,
} from '../../../../scripts/types'
import axios from 'axios'

export const useMapGenerator = () => {
  const SolarSystems = useSdeStore((state) => state.SolarSystems)
  const Stargates = useSdeStore((state) => state.Stargates)
  const huntingSystemId = useHuntingStore((state) => state.huntingSystemId)
  const huntingRange = useHuntingStore((state) => state.huntingRange)
  const updateMap = useMapStore((state) => state.updateMap)
  const systems = useMapStore((state) => state.systems)

  const kills = useSystemStatistics((state) => state.kills)
  const statsTs = useSystemStatistics((state) => state.statsTs)

  const addMapStatistics = useSystemStatistics((state) => state.addStats)
  const calculateAverages = useSystemStatistics(
    (state) => state.calculateAverages
  )

  //const previousSystemIds = usePrevious(systems.map((x) => x.system_id))

  const generateNewRangeMap = () => {
    const huntingSystem = SolarSystems.find(
      (x) => x.system_id == huntingSystemId
    )
    if (!huntingSystem) {
      updateMap([], [])
      return
    }

    const LoadsystemConnections = (
      system: SolarSystem,
      jumps: number
    ): SolarSystem => {
      const gates: Stargate[] = Stargates.filter(
        (h) => h.fromSolarSystemID == system.system_id
      )
      const connections: SolarSystem[] = SolarSystems.filter((s) =>
        gates.map((x) => x.toSolarSystemID).includes(s.system_id)
      )

      const distance = Math.sqrt(
        Math.pow(system.x - huntingSystem.x, 2) +
          Math.pow(system.y - huntingSystem.y, 2) +
          Math.pow(system.z - huntingSystem.z, 2)
      )

      return {
        ...system,
        distance,
        jumps,
        gates,
        connections,
      }
    }

    let parsedSystems: number[] = []
    let systems: SolarSystem[] = []
    let nextSet: SolarSystem[] = [huntingSystem]

    for (let i = 0; i <= huntingRange; i++) {
      //get the adjasent solar systems using gates
      let nextConnections: SolarSystem[] = []
      nextSet.forEach((system) => {
        if (parsedSystems.includes(system.system_id)) {
          return
        }

        const loadedSystem = LoadsystemConnections(system, i + 1)

        nextConnections = [
          ...nextConnections,
          ...(loadedSystem.connections ?? []),
        ]

        systems.push(loadedSystem)
        parsedSystems.push(loadedSystem.system_id)
      })
      nextSet = nextConnections
    }

    let _connections: Connection[] = []
    systems.forEach((system) => {
      system.gates?.forEach((c) => {
        let connection = _connections.find(
          (co) =>
            (co.system1.system_id === c.fromSolarSystemID &&
              co.system2.system_id === c.toSolarSystemID) ||
            (co.system1.system_id === c.toSolarSystemID &&
              co.system2.system_id === c.fromSolarSystemID)
        )

        if (connection == null) {
          let system2 = systems.find((ns) => ns.system_id === c.toSolarSystemID)
          if (system2) {
            let s2Jumps = system2.jumps ?? 0
            let jumps =
              system?.jumps ?? 0 > s2Jumps
                ? system.jumps ?? 0
                : system2.jumps ?? 0
            _connections.push({ system1: system, system2, jumps })
          }
        }
      })
    })

    updateMap(systems, _connections)

    const outdatedId = statsTs
      .filter((x) =>
        dayjs.utc(x.date).isBefore(dayjs.utc().subtract(1, 'hour'))
      )
      .map((x) => x.system_id)
    const hasStatsFor = statsTs.map((x) => x.system_id)

    const statsRequest = systems
      .map((x) => x.system_id)
      .filter((id) => {
        return outdatedId.includes(id) || !hasStatsFor.includes(id)
      })

    if (statsRequest.length > 0) {
      axios
        .post<{ kills: KillsStatistics[]; jumps: JumpStatistics[] }>(
          '/api/sde/stats',
          { systems: statsRequest }
        )
        .then((response) => {
          addMapStatistics(
            response.data.kills,
            response.data.jumps,
            systems.map((x) => x.system_id)
          )
          calculateAverages(systems.map((x) => x.system_id))
        })
    }
  }

  useEffect(() => {
    generateNewRangeMap()
  }, [huntingSystemId, huntingRange])
}
