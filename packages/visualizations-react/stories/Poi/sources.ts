
import { PoiMapData } from '@opendatasoft/visualizations';

const sources : PoiMapData["sources"] = {
    cities : {
        type: 'geojson', 
        data: {
            type: 'FeatureCollection',
            features: [
                {
                    id: 1,
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [2.357573,48.837904],
                    },
                    properties: {
                        key: 'Paris'
                    },
                },
                {
                    id: 2,
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [-0.563328,44.838245],
                    },
                    properties: {
                        key: 'Bordeaux'
                    },
                },
                {
                    id: 3,
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [-1.552924,47.214847],
                    },
                    properties: {
                        key: 'Nantes'
                    },
                },
                {
                    id: 4,
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [5.360529,43.303114],
                    },
                    properties: {
                        key: 'Marseille'
                    },
                },
            ],
        }
    },
    battles : {
        type: 'geojson',
        data: {
            type: "FeatureCollection",
            features: [
                { 
                    id: 5,
                    type: "Feature",
                    properties: {
                        name: "Battle of Verdun",
                        date: "1916",
                        description: "The Battle of Verdun was fought from 21 February to 18 December 1916 on the Western Front in France. The battle was the longest of the First World War and took place on the hills north of Verdun-sur-Meuse."
                    },
                    geometry: {
                        type: "Point",
                        coordinates: [5.422, 49.208]
                    }
                },
                {
                    id: 6,
                    type: "Feature",
                    properties: {
                        name: "Battle of the Somme",
                        date: "1916",
                        description: "The Battle of the Somme, also known as the Somme offensive, was a battle of the First World War fought by the armies of the British Empire and the French Third Republic against the German Empire."
                    },
                    geometry: {
                        type: "Point",
                        coordinates: [2.712, 49.993 ]
                    }
                },
            ]
          }
          
    }
};

export default sources;



