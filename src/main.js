import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const map = new maplibregl.Map({
    container: 'map',
    style: {
        version: 8,
        sources: {
            'osm-tiles': {
                type: 'raster',
                tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
                tileSize: 256,
                attribution: '&copy; OpenStreetMap contributors'
            }
        },
        layers: [{ id: 'osm-layer', type: 'raster', source: 'osm-tiles' }]
    },
    center: [-58.4200, -34.6100], // Centrado en Ciudad de Buenos Aires
    zoom: 12
});

map.on('load', () => {
    // --- Capa de Líneas de Subte ---
    map.addSource('subte-lineas', {
        type: 'geojson',
        data: '/data/lineas.geojson'
    });

    map.addLayer({
        id: 'layer-lineas',
        type: 'line',
        source: 'subte-lineas',
        paint: {
            'line-color': [
                'match',
                ['get', 'LINEASUB'], 
                'LINEA A', '#00afdb',
                'LINEA B', '#db002d',
                'LINEA C', '#003896',
                'LINEA D', '#007d4a',
                'LINEA E', '#6c2b7e',
                'LINEA H', '#ffce00',
                '#808080' // Gris para trazados no identificados
            ],
            'line-width': 4
        }
    });

    // --- Capa de Estaciones de Subte ---
    map.addSource('subte-estaciones', {
        type: 'geojson',
        data: '/data/estaciones.geojson'
    });

    map.addLayer({
        id: 'layer-estaciones',
        type: 'circle',
        source: 'subte-estaciones',
        paint: {
            'circle-radius': 5,
            'circle-color': '#ffffff',
            'circle-stroke-width': 2,
            'circle-stroke-color': '#000000'
        }
    });
});