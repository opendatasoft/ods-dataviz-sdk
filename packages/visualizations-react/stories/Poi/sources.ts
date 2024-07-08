
import { PoiMapData } from '@opendatasoft/visualizations';

const sources : Required<PoiMapData>["value"]["sources"] = {
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
                        key: 'Paris--duplicate',
                        description: 'Same location as Paris'
                    },
                },
                {
                    id: 2,
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [2.357573,48.837904],
                    },
                    properties: {
                        key: 'Paris',
                        description: 'Officia deserunt commodo enim ea ad veniam enim consectetur aliquip adipisicing duis. Exercitation aute velit pariatur est et ea qui veniam ad duis quis ad aliquip. Ipsum exercitation dolor tempor deserunt sunt amet laborum tempor excepteur est sunt ea quis.'
                    },
                },
                {
                    id: 3,
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [-0.563328,44.838245],
                    },
                    properties: {
                        key: 'Bordeaux',
                        description: 'Pariatur duis mollit sit id ullamco ea non ad dolore voluptate nostrud deserunt fugiat proident. Sunt dolor qui consectetur exercitation mollit proident Lorem laborum cillum sit Lorem id eiusmod. Lorem culpa tempor aliqua aliquip reprehenderit. Aute officia reprehenderit aute pariatur incididunt nostrud exercitation voluptate id est ex. Qui eiusmod est enim est ipsum elit laboris.'
                    },
                },
                {
                    id: 4,
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [-1.552924,47.214847],
                    },
                    properties: {
                        key: 'Nantes',
                        description: "Irure incididunt deserunt officia eiusmod occaecat duis nostrud sint excepteur. Id non voluptate non proident sunt sit nisi eiusmod sit excepteur duis cillum adipisicing. Nostrud officia ad tempor quis commodo aute elit tempor reprehenderit esse est aute fugiat reprehenderit. Aliquip eu occaecat Lorem cupidatat labore consequat. Culpa commodo sunt proident exercitation. Enim voluptate minim veniam enim nulla aute dolor magna est elit aliqua. Ex occaecat fugiat laboris do do dolor nostrud cupidatat."
                    },
                },
                {
                    id: 5,
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [5.360529,43.303114],
                    },
                    properties: {
                        key: 'Marseille',
                        description: "Dolore nisi non id labore. Ea deserunt irure nisi nisi deserunt anim nisi et. Culpa sint mollit deserunt ea eiusmod laborum nostrud."
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
                        description: "The Battle of Verdun was fought from 21 February to 18 December 1916 on the Western Front in France. The battle was the longest of the First World War and took place on the hills north of Verdun-sur-Meuse. Nisi magna dolor ullamco Lorem culpa ea tempor exercitation dolor ex cupidatat esse voluptate ea. Incididunt consectetur ut officia eiusmod voluptate commodo adipisicing tempor eiusmod esse nulla veniam ut. Aute ipsum eiusmod culpa dolore ea aliquip nulla consectetur reprehenderit in mollit nostrud. Elit commodo non est voluptate pariatur. Exercitation reprehenderit pariatur dolore aute elit ea dolor commodo cillum. Est dolore ut elit in. Ullamco est laborum aute labore. Cillum incididunt laboris do eiusmod fugiat enim veniam aliquip duis incididunt laboris anim nostrud. Laborum mollit esse magna fugiat fugiat fugiat aliquip." 
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
          
    },
    moselle: {
        type: 'geojson',
        data: 'https://france-geojson.gregoiredavid.fr/repo/departements/57-moselle/departement-57-moselle.geojson'
    }
};

export default sources;



