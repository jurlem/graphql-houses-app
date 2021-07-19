import { useState } from "react";
import Link from "next/link";
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export { };


interface IHouse {
  id: string;
  latitude: number;
  longitude: number
}

interface IProps {
  house: IHouse;
  nearby: IHouse[]
}


export default function SingleMap({ house, nearby }: IProps) {

  console.log({ nearby })
  const [viewport, setViewport] = useState({
    latitude: house.latitude,
    longitude: house.longitude,
    zoom: 13
  })

  return (<div className="text-black">
    <ReactMapGL
      {...viewport}
      width="100%"
      height="calc(100vh - 64px)"
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      minZoom={8}
      mapStyle="mapbox://styles/leighhalliday/ckhjaksxg0x2v19s1ovps41ef"
      scrollZoom={false}
    >
      <div className="absolute top-0 left-0 p-4">
        <NavigationControl showCompass={false} />
      </div>

      <Marker
        latitude={house.latitude}
        longitude={house.longitude}
        offsetLeft={-15}
        offsetTop={-15}
      >
        <button type="button" >
          <img src="/home-color.svg" className="w-8" alt="selected house" />
        </button>
      </Marker>
      {nearby.map(near => (
        <Marker
          key={near.id}
          latitude={near.latitude}
          longitude={near.longitude}
          offsetLeft={-15}
          offsetTop={-15}
        >
          <Link href={`/houses/${near.id}`}>
            <a >
              <img src="/home-solid.svg" className="w-8" alt="nerby house" />
            </a>
          </Link>

        </Marker >
      ))}
    </ReactMapGL>

  </div>)
}