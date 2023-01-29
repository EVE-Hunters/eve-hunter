import { useHuntingStore, useMapStore } from '../../../../scripts/Stores'
import { Connection, SolarSystem } from '../../../../scripts/types'
import createGraph, { Graph } from 'ngraph.graph'
import path from 'ngraph.path'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useScroll } from '@react-three/drei'

const generateGraph = (systems: SolarSystem[], Connections: Connection[]) => {
  const graph = createGraph()
  systems.forEach((system) => {
    graph.addNode(system.system_id, {
      system_id: system.system_id,
      x: system.x,
      y: system.y,
      z: system.z,
    })
  })
  Connections.forEach((connection) => {
    graph.addLink(connection.system1.system_id, connection.system2.system_id)
  })
  return graph
}

const generateRoute = (
  connectionGraph: Graph,
  source?: number | null,
  destination?: number | null
) => {
  if (!source || !destination) {
    return null
  }

  const pathfinder = path.aStar(connectionGraph, {
    distance: (fromNode, toNode, link) => {
      return Math.sqrt(
        Math.pow(fromNode.data.x - toNode.data.x, 2) +
          Math.pow(fromNode.data.y - toNode.data.y, 2) +
          Math.pow(fromNode.data.z - toNode.data.z, 2)
      )
    },
    heuristic: (fromNode, toNode) => {
      return Math.sqrt(
        Math.pow(fromNode.data.x - toNode.data.x, 2) +
          Math.pow(fromNode.data.y - toNode.data.y, 2) +
          Math.pow(fromNode.data.z - toNode.data.z, 2)
      )
    },
  })
  return pathfinder.find(source, destination)
}

export const useRouteCalculator = () => {
  const systems = useMapStore((data) => data.systems)
  const connections = useMapStore((data) => data.connections)
  const huntingSystemId = useHuntingStore((data) => data.huntingSystemId)
  const highlightedSystem = useMapStore((state) => state.highlightedSystem)
  const setHighlightedRoute = useMapStore((state) => state.setHighlightedRoute)
  const primaryhunter = useHuntingStore((state) => state.primaryHunter)
  const usershunters = useHuntingStore((state) =>
    state.currentLocations.filter((x) => x.character_id == primaryhunter)
  )

  const primaryHunterLocation = usershunters[0]?.system_id ?? null

  const graphRef = useRef(createGraph())

  const updateGraph = () => {
    const addToGraph = systems.filter(
      (x) => !graphRef.current.hasNode(x.system_id)
    )
    addToGraph.forEach((system) => {
      graphRef.current.addNode(system.system_id, {
        system_id: system.system_id,
        x: system.x,
        y: system.y,
        z: system.z,
      })
    })
    const addConnections = connections.filter(
      (x) => !graphRef.current.hasLink(x.system1.system_id, x.system2.system_id)
    )
    addConnections.forEach((x) => {
      graphRef.current.addLink(x.system1.system_id, x.system2.system_id)
    })
  }

  useEffect(() => {
    updateGraph()
  }, [systems])

  useEffect(() => {
    if (graphRef.current) {
      setHighlightedRoute(
        generateRoute(graphRef.current, huntingSystemId, highlightedSystem)
      )
    }
  }, [huntingSystemId, highlightedSystem])
}

export const useSystemIsInRoute = (systems: number[]) => {
  const highlightedRoute = useMapStore((state) => state.highlightedRoute)
  return (
    highlightedRoute?.filter((x) => systems.includes(x.data.system_id))
      .length == systems.length
  )
}
