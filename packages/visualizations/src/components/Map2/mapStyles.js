export const BLANK = {
    "version": 8,
    "sources": {},
    "metadata": {},
    "layers": []
};

export const RASTER_OSM_TEST = {
    "version": 8,
    "sources": {
        "raster": {
            "type": "raster",
            "tiles": [
                "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            ],
            "tileSize": 256,            
        }
    },
    "metadata": {},
    "layers": [
        {
            "id": "raster",
            "type": "raster",
            "source": "raster",
            "minzoom": 0,
            "maxzoom": 22
        }
    ]
}