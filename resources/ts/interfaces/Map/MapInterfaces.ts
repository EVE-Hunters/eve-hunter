
export interface RegionInterface {
    region_id: number,
    name: string
}

export interface ConstellationInterface {
    constellation_id: number,
    region_id: number,
    name: string
}

export interface SystemConnection {
    fromSolarSystemID: number,
    toSolarSystemID: number
}

export interface SystemKillStatsInterface {
    //system_id: number,
    npc_kills: number,
    ship_kills: number,
    pod_kills: number,
}

export interface SystemJumpStatsInterface {
    //system_id: number,
    ship_jumps: number,
}

export interface SolarSystemInterface {
    system_id: number,
    constellation_id: number,
    region_id: number,
    name: string,
    constellation: ConstellationInterface,
    region: RegionInterface
    connections: SystemConnection[],
    system_jumps: SystemJumpStatsInterface,
    ice: boolean,
    security: number,
    jumps?: number,
    distance?: number,
    x: number,
    y: number,
    z: number,

    //stats
    npc_delta: number,
    system_kill_day: SystemKillStatsInterface,
    system_kill_hour: SystemKillStatsInterface,
    /*kill_24h: SystemKillStatsInterface[],
    kill_stats_latest: SystemKillStatsInterface,
    latest_system_jumps: SystemJumpStatsInterface,
    npc_24h: number,
    npc_delta: number,*/
}

export type ISolarSystem = Omit<SolarSystemInterface, "distance"|"jumps"|"connections"|"npc_delta"|"system_kill_day"|"system_kill_hour">

export interface ISolarSystemGate {
    fromRegionID: number,
    fromConstellationID: number,
    fromSolarSystemID: number,
    toSolarSystemID: number
    toRegionID: number,
}

export interface Connection {
    system1: SolarSystemInterface,
    system2: SolarSystemInterface
    jumps: number,
}

export interface CentroidInterface {
    x: number,
    y: number,
    z: number,
}

export interface HunterLocationInterface {
    system: number,
    character_id: number,
}

export interface locationHistory {
    character_id: number,
    system: SolarSystemInterface
}

export interface MapRenderSettings {
    //render settings
    delta: boolean,
    npc1h: boolean,
    npc24h: boolean,
    jumps: boolean,
    security: boolean,
}
