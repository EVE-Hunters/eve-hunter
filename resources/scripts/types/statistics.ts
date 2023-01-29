export interface KillsStatistics {
  id: number
  system_id: number
  npc_kills: number
  ship_kills: number
  pod_kills: number
  created_at: string
}

export interface JumpStatistics {
  id: number
  system_id: number
  ship_jumps: number
  created_at: string
}
