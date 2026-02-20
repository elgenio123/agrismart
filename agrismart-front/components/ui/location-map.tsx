"use client";

import React, { useCallback, memo } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { Loader2 } from "lucide-react";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

const defaultMapOptions: google.maps.MapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  gestureHandling: "greedy",
  styles: [
    { featureType: "poi", stylers: [{ visibility: "off" }] },
    { featureType: "transit", stylers: [{ visibility: "off" }] },
  ],
};

interface LocationMapProps {
  lat: number;
  lng: number;
  zoom?: number;
  className?: string;
  markerLabel?: string;
}

function LocationMapInner({ lat, lng, zoom = 13, className = "h-40 w-full rounded-lg overflow-hidden", markerLabel }: LocationMapProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    id: "agrsmart-google-map",
  });

  const center = { lat, lng };

  const onLoad = useCallback((map: google.maps.Map) => {
    map.setCenter(center);
  }, [lat, lng]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loadError || !GOOGLE_MAPS_API_KEY) {
    // Fallback: static map via iframe embed (no API key needed)
    return (
      <div className={className}>
        <iframe
          title={markerLabel ?? "Farm location"}
          src={`https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className={`${className} bg-surface-secondary flex items-center justify-center`}>
        <Loader2 className="h-5 w-5 text-text-muted animate-spin" />
      </div>
    );
  }

  return (
    <div className={className}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={center}
        zoom={zoom}
        options={defaultMapOptions}
        onLoad={onLoad}
      >
        <Marker position={center} title={markerLabel} />
      </GoogleMap>
    </div>
  );
}

export const LocationMap = memo(LocationMapInner);
