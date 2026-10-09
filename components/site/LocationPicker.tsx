'use client';

import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState } from 'react';
import type { LayerGroup, Map as LMap, Marker, Rectangle, TileLayer } from 'leaflet';

/** Karten von swisstopo (frei nutzbar mit Quellenangabe), im Web-Mercator-Raster */
const TILES = {
  karte: 'https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg',
  luftbild: 'https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.swissimage/default/current/3857/{z}/{x}/{y}.jpeg',
};
// Forstwerkhof Hackern, Lungern
const WERKHOF: [number, number] = [46.7803, 8.1566];

/** 3×3-m-Raster (wie what3words): Gradschritte für 3 m, Längengrad auf Höhe Lungern gerechnet */
const CELL_M = 3;
const D_LAT = CELL_M / 111320;
const D_LNG = CELL_M / (111320 * Math.cos((WERKHOF[0] * Math.PI) / 180));
/** Ab dieser Zoomstufe ist das Raster sichtbar und ein Feld wählbar */
const GRID_ZOOM = 18;
const cellOf = (p: LatLng) => {
  const lat0 = Math.floor(p.lat / D_LAT) * D_LAT;
  const lng0 = Math.floor(p.lng / D_LNG) * D_LNG;
  return { center: { lat: lat0 + D_LAT / 2, lng: lng0 + D_LNG / 2 }, bounds: [[lat0, lng0], [lat0 + D_LAT, lng0 + D_LNG]] as [[number, number], [number, number]] };
};

export type LatLng = { lat: number; lng: number };

export const fmtPos = (p: LatLng) => p.lat.toFixed(5) + ', ' + p.lng.toFixed(5);

/** Karte zum Markieren des Einsatzorts, direkt geöffnet: hineinzoomen und ein 3×3-m-Feld antippen */
export function LocationPicker({ value, onChange }: { value: LatLng | null; onChange: (p: LatLng | null) => void }) {
  const [layer, setLayer] = useState<keyof typeof TILES>('luftbild');
  const boxRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LMap | null>(null);
  const tilesRef = useRef<TileLayer | null>(null);
  const markerRef = useRef<Marker | null>(null);
  const cellRef = useRef<Rectangle | null>(null);
  const [zoomedIn, setZoomedIn] = useState(!!value);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    if (!boxRef.current) return;
    let cancelled = false;
    import('leaflet').then((L) => {
      if (cancelled || !boxRef.current) return;
      const map = L.map(boxRef.current, { center: value ? [value.lat, value.lng] : WERKHOF, zoom: value ? 19 : 15, maxZoom: 20, minZoom: 8 });
      map.attributionControl.setPrefix(false);
      tilesRef.current = L.tileLayer(TILES[layer], { maxNativeZoom: 19, maxZoom: 20, attribution: '© swisstopo' }).addTo(map);
      const icon = L.divIcon({ className: 'map-pin', html: '<span></span>', iconSize: [28, 38], iconAnchor: [14, 38] });

      // Raster nur für den sichtbaren Ausschnitt zeichnen
      const grid: LayerGroup = L.layerGroup().addTo(map);
      const drawGrid = () => {
        grid.clearLayers();
        const on = map.getZoom() >= GRID_ZOOM;
        setZoomedIn(on);
        if (!on) return;
        const b = map.getBounds();
        const lat0 = Math.floor(b.getSouth() / D_LAT) * D_LAT;
        const lng0 = Math.floor(b.getWest() / D_LNG) * D_LNG;
        const style = { className: 'map-grid', interactive: false, weight: 1 };
        for (let lat = lat0; lat <= b.getNorth() + D_LAT; lat += D_LAT) L.polyline([[lat, b.getWest()], [lat, b.getEast()]], style).addTo(grid);
        for (let lng = lng0; lng <= b.getEast() + D_LNG; lng += D_LNG) L.polyline([[b.getSouth(), lng], [b.getNorth(), lng]], style).addTo(grid);
      };
      map.on('moveend zoomend', drawGrid);
      drawGrid();

      const place = (p: LatLng) => {
        const c = cellOf(p);
        if (cellRef.current) cellRef.current.setBounds(c.bounds);
        else cellRef.current = L.rectangle(c.bounds, { className: 'map-cell', interactive: false, weight: 2 }).addTo(map);
        if (markerRef.current) markerRef.current.setLatLng(c.center);
        else {
          markerRef.current = L.marker(c.center, { icon, draggable: true }).addTo(map);
          markerRef.current.on('dragend', () => place(markerRef.current!.getLatLng()));
        }
        onChangeRef.current(c.center);
      };
      if (value) place(value);
      // Weit weg: Klick zoomt zum Ort; nah genug: Klick wählt das 3×3-m-Feld
      map.on('click', (e) => {
        if (map.getZoom() < GRID_ZOOM) map.flyTo(e.latlng, 19, { duration: 0.8 });
        else place(e.latlng);
      });
      mapRef.current = map;
    });
    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      markerRef.current = null;
      cellRef.current = null;
    };
    // Karte nur einmal aufbauen
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    tilesRef.current?.setUrl(TILES[layer]);
  }, [layer]);

  return (
    <div className="map-picker">
      <div className="map-picker__map" ref={boxRef} />
      <div className="map-picker__layers" role="group" aria-label="Kartenart">
        {(['luftbild', 'karte'] as const).map((k) => (
          <button key={k} type="button" className={layer === k ? 'is-active' : undefined} onClick={() => setLayer(k)}>
            {k === 'luftbild' ? 'Luftbild' : 'Karte'}
          </button>
        ))}
      </div>
      <div className="map-picker__info">
        {value ? (
          <>
            <span>
              Markiertes Feld (3×3 m): <strong>{fmtPos(value)}</strong>
            </span>
            <button
              type="button"
              className="link-button"
              onClick={() => {
                markerRef.current?.remove();
                markerRef.current = null;
                cellRef.current?.remove();
                cellRef.current = null;
                onChange(null);
              }}
            >
              Markierung entfernen
            </button>
          </>
        ) : (
          <span>
            {zoomedIn
              ? 'Tippen Sie auf das 3×3-m-Feld, das Sie meinen. Die Markierung lässt sich verschieben.'
              : 'Tippen Sie auf die Karte, um zum Ort zu zoomen – danach wählen Sie ein 3×3-m-Feld.'}
          </span>
        )}
      </div>
    </div>
  );
}
