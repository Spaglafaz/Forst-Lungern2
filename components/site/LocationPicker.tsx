'use client';

import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState } from 'react';
import type { Map as LMap, Marker, TileLayer } from 'leaflet';

/** Karten von swisstopo (frei nutzbar mit Quellenangabe), im Web-Mercator-Raster */
const TILES = {
  karte: 'https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg',
  luftbild: 'https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.swissimage/default/current/3857/{z}/{x}/{y}.jpeg',
};
// Forstwerkhof Hackern, Lungern
const WERKHOF: [number, number] = [46.7803, 8.1566];

export type LatLng = { lat: number; lng: number };

export const fmtPos = (p: LatLng) => p.lat.toFixed(5) + ', ' + p.lng.toFixed(5);

/** Karte zum Markieren des Einsatzorts, direkt geöffnet */
export function LocationPicker({ value, onChange }: { value: LatLng | null; onChange: (p: LatLng | null) => void }) {
  const [layer, setLayer] = useState<keyof typeof TILES>('luftbild');
  const boxRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LMap | null>(null);
  const tilesRef = useRef<TileLayer | null>(null);
  const markerRef = useRef<Marker | null>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    if (!boxRef.current) return;
    let cancelled = false;
    import('leaflet').then((L) => {
      if (cancelled || !boxRef.current) return;
      const map = L.map(boxRef.current, { center: value ? [value.lat, value.lng] : WERKHOF, zoom: value ? 17 : 15, maxZoom: 19, minZoom: 8 });
      map.attributionControl.setPrefix(false);
      tilesRef.current = L.tileLayer(TILES[layer], { maxZoom: 19, attribution: '© swisstopo' }).addTo(map);
      const icon = L.divIcon({ className: 'map-pin', html: '<span></span>', iconSize: [28, 38], iconAnchor: [14, 38] });
      const place = (p: LatLng) => {
        if (markerRef.current) markerRef.current.setLatLng(p);
        else {
          markerRef.current = L.marker(p, { icon, draggable: true }).addTo(map);
          markerRef.current.on('dragend', () => onChangeRef.current(markerRef.current!.getLatLng()));
        }
        onChangeRef.current({ lat: p.lat, lng: p.lng });
      };
      if (value) place(value);
      map.on('click', (e) => place(e.latlng));
      mapRef.current = map;
    });
    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      markerRef.current = null;
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
              Markiert: <strong>{fmtPos(value)}</strong>
            </span>
            <button
              type="button"
              className="link-button"
              onClick={() => {
                markerRef.current?.remove();
                markerRef.current = null;
                onChange(null);
              }}
            >
              Markierung entfernen
            </button>
          </>
        ) : (
          <span>Tippen Sie auf die Karte, um den Ort zu markieren. Die Markierung lässt sich verschieben.</span>
        )}
      </div>
    </div>
  );
}
