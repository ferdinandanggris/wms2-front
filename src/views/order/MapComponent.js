import { useEffect, useRef, useState } from "react";

const MapComponent = ({ oList, dList }) => {
  const refMap = useRef();

  const [oriMap, setOri] = useState(null);
  const [dstMap, setDst] = useState(null);

  useEffect(() => {
    if (oList !== undefined && oList !== null && dList !== undefined && dList !== null) {
      if (oriMap === null || oriMap.lat != oList.lat || oriMap.lng != oList.lng || dstMap === null || dstMap.lat != dList.lat || dstMap.lng != dList.lng) {
        var ori = new window.google.maps.LatLng(oList.lat, oList.lng);
        var dst = new window.google.maps.LatLng(dList.lat, dList.lng);

        setOri(oList);
        setDst(dList);

        const map = new window.google.maps.Map(refMap.current, {
          center: ori,
          zoom: 16,
          mapTypeControl: false,
          controlSize: 20,
        });

        var bounds = new window.google.maps.LatLngBounds();
        bounds.extend(ori);
        bounds.extend(dst);
        map.fitBounds(bounds);

        var directionsService = new window.google.maps.DirectionsService();
        var directionsRenderer = new window.google.maps.DirectionsRenderer();
        var request = {
          origin: ori,
          destination: dst,
          travelMode: "DRIVING",
        };
        directionsService.route(request, function (result, status) {
          if (status === "OK") {
            directionsRenderer.setDirections(result);
          }
        });
        directionsRenderer.setMap(map);
      }
    }
  });

  return <div ref={refMap} id="map" className="map" style={{ height: "500" }} />;
};

export default MapComponent;
