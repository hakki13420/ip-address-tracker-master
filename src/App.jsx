import { styled } from 'styled-components'
import './App.css'
import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Header from './components/Header'
import axios from 'axios'

function App () {
  const [publicIp, setPublicIp] = useState('')
  const [domain, setDomain] = useState('')
  const [position, setPosition] = useState([52.51, 13.38])
  const [geoLocaData, setGeoLocaData] = useState({
    ip: '',
    location: '',
    timeZone: '',
    isp: '',
    lat: 52.51,
    lng: 13.38
  })

  useEffect(() => {
    const getPublicIp = async () => {
      const { data } = await axios.get(import.meta.env.VITE_URL_IPIFY)
      setPublicIp(data)
    }
    getPublicIp()
  }, [])

  useEffect(() => {
    const getGeoData = async () => {
      try {
        const { data } = domain === ''
          ? await axios.get(`${import.meta.env.VITE_URL_GEO_IP}${publicIp}`)
          : await axios.get(`${import.meta.env.VITE_URL_GEO_DOMAIN}${domain}`)
        data && setGeoLocaData({
          ...geoLocaData,
          ip: data?.ip,
          location: data?.location?.city + ', ' + data?.location?.postalCode,
          timeZone: data?.location?.timezone,
          isp: data?.isp,
          lat: data?.location?.lat,
          lng: data?.location?.lng
        })
      } catch (error) {
        console.log(error)
      }
    }
    getGeoData()
  }, [publicIp, domain])

  useEffect(() => {
    const arr = [geoLocaData?.lat, geoLocaData?.lng]
    setPosition([...arr])
  }, [geoLocaData.lat, geoLocaData.lng])

  const MapWrapper = styled.div`
    width:100%;
    height:calc(100% - 200px);

   .leaflet-container {
      width: 100%;
      height: 100%;
      position:relative;
      z-index:-1;      
    }
  `

  return (
    <>
    {console.log('position', position)}
      <Header ipPublic={publicIp}
              setPublicIp={setPublicIp}
              setDomain={setDomain}
              ip={geoLocaData.ip}
              location={geoLocaData.location}
              timeZone={geoLocaData.timeZone}
              isp={geoLocaData.isp}
      />
        {
          position && <MapWrapper>
          <MapContainer center={position} zoom={6} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} >
            <Popup>
              ???
            </Popup>
          </Marker>
          </MapContainer>
        </MapWrapper>
        }
    </>
  )
}

export default App
