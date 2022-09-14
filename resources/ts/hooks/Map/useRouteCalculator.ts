import { useEffect, useMemo } from 'react';
import { Connection, SolarSystemInterface } from '../../interfaces/Map/MapInterfaces';
import { useMapStore } from '../../stores/Map/MapStore';
import createGraph, {Graph} from 'ngraph.graph';
import path, {PathFinder} from 'ngraph.path';
import { useMapSettingsStore } from '../../stores/Map/MapSettingsStore';


const calculateDistance = (source: SolarSystemInterface, destination: SolarSystemInterface): number => {
	return Math.sqrt(
		Math.pow(source.x - destination.x, 2) +
        Math.pow(source.y - destination.y, 2) +
        Math.pow(source.z - destination.z, 2)
	);
};

const generateGraph = (NearBySystems: SolarSystemInterface[], Connections: Connection[]): Graph => {
	const graph = createGraph();
	NearBySystems.forEach(system => {
        graph.addNode(system.system_id, {system_id: system.system_id, x: system.x, y: system.y, z: system.z})
	});
    Connections.forEach(connection => {
        graph.addLink(connection.system1.system_id, connection.system2.system_id);
    })
	return graph;
};


const generateRoute = (connectionGraph: Graph, source?: SolarSystemInterface | null, destination?: SolarSystemInterface | null) => {
    let route = [];
    if(!source || !destination)
        return null

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
    });
    route = pathfinder.find(source.system_id, destination.system_id);
    return route;
}




export const useCalculateRoute = () => {
    const FocusedSystem = useMapSettingsStore((state) => state.focusedSystem);
    const Destination = useMapSettingsStore((state) => state.destination);
    const setHighlightedRoute = useMapSettingsStore((state) => state.setHighlightedRoute);
	const {HuntingSystem, NearBySystems, Connections} = useMapStore((state) => ({
		HuntingSystem: state.HuntingSystem,
		NearBySystems: state.NearBySystems,
		Connections: state.Connections
	}));

    const connectionGraph = useMemo<Graph>(() => {
		const graph = generateGraph(NearBySystems, Connections);
		console.log('graph:', graph);
		return graph;
	}, [NearBySystems]);

    useEffect(() => {
        setHighlightedRoute(generateRoute(connectionGraph, HuntingSystem, FocusedSystem));
    }, [HuntingSystem, connectionGraph, FocusedSystem])


};
