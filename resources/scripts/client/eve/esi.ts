


const EsiRoutes = {
    'waypoint.add': {
        route: `https://esi.evetech.net/v2/ui/autopilot/waypoint/?destination_id={system}&clear_other_waypoints=true&add_to_beginning=false&token={token}`,
        query: ['system', 'token']
    }
}

export function esiRoute<T = keyof typeof EsiRoutes(route: T){

}

esiRoute('waypoint.add', )
