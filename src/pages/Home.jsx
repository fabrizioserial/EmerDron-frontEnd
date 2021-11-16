import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import styled from "styled-components";
import GoogleMapReact from 'google-map-react';
import  AnyReactComponent from 'google-map-react';
// ES6
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Marker from "react-mapbox-gl";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoiZmFicml6aW9zZXJpYWwiLCJhIjoiY2t2ZmlkampzYnN4ejJ3bWFidjE5cWFqZSJ9.EN5eWo0b-RPjbMMF-P-VXQ';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Map = ReactMapboxGl({
    accessToken:
        'pk.eyJ1IjoiZmFicml6aW9zZXJpYWwiLCJhIjoiY2t2ZmlkampzYnN4ejJ3bWFidjE5cWFqZSJ9.EN5eWo0b-RPjbMMF-P-VXQ'
});

const MapContainer = styled.div`
  width: 100%;
  height: 100vh;
`

const Container = styled.div`
  height: 600px;
  width: 450px;
  background-color: whitesmoke;
  border-radius: 8px;
  position: absolute;
  right: 0;
  margin-right: 50px;
  top:20%;
`

const Header = styled.div`
  height: 40px;
  width: 100%;
  background-color: #61dafb;
  
`

const DivContainerRow = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: center;
`

const InputDron = styled.input`
  position: relative;
  height: 30px;
  width: 100%;
  border-bottom-color: #282c34;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-top-style: none;
  border-left-style: none;
  border-right-style: none;
`;

const Text = styled.p`
  font-size: 18px;
  margin-top: 0;
  margin-right: 0;
  margin-bottom: 0;
  margin-left: ${(props) => props.ml ? props.ml : 0 };
  color: ${ (props) =>
    props.black ? "#282c34" : "darkgray"
  };
  font-weight: ${(props) => props.black ? 600 : 400};
`

const InputContainer = styled.div`
  flex: ${(props) => props.full ? 0.92 : 0.46};
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 8px 10px;
  align-items:start;
  position: relative;
  box-sizing: border-box;
`

const ImageContainer = styled.div`
  width: 100%;
  padding-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Image = styled.img`
  width: 90%;
  height: 270px;
  object-fit: cover;
`

const LoadingContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const RefreshButton = styled.div`
  position: absolute;
  top: 10%;
  left: 10px;
  width: 100px;
  height: 30px;
  background-color: rgba(45, 177, 182, 0.38);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #7cfcff;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
  &:hover{
    background-color:rgba(45, 177, 182, 0.5) ;
  }
`

const BASE_URL = "http://822e-170-51-141-5.ngrok.io";

export const Home = (props) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-58.859160);
    const [lat, setLat] = useState(-34.455219);
    const [zoom, setZoom] = useState(9);
    const [place, setPlace] = useState('Loading...');
    const [activeMark, setActiveMark] = useState();
    const [elements,setElements] = useState([]);
    const [location,setLocation] = useState(elements[0])
    const [loading, setLoading] = useState(false);

    const fetchDetections = () => {
        axios.get(`${BASE_URL}/api/scan`).then((response) => {
            setElements(response.data)
        }).catch(e => console.log(e))
    }

    useEffect(() => {
        fetchDetections()
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [lng, lat],
            zoom: zoom
        });
    }, []);

    useEffect(()=> {
        console.log(elements)
        if(map && elements && elements.length > 0){
            elements.map(
                (locations) => {
                    console.log(locations)
                    let marker = new mapboxgl.Marker()
                        .setLngLat([locations.location.longitude,locations.location.latitude])
                        .setPopup(new mapboxgl.Popup({offset:30}))
                        .addTo(map.current)
                    marker.getElement().addEventListener('click', () => {
                        setActiveMark(locations)
                        setLoading(true);
                    });
                }
            )

        }
    },[elements])

    useEffect(()=>{
        if(activeMark){
            const name = getLocationByCoordinates([activeMark.location.longitude,activeMark.location.latitude])
            setPlace(name)
            axios.get(`${BASE_URL}/api/scan/${activeMark.id}`).then((response) => {
                console.log(response.data)
                axios.get(`${BASE_URL}/api/frame/${response.data.frames[0].id}`).then(res =>{
                    console.log("res: ", res.data)
                    setLocation(res.data)
                    setLoading(false)
                })
            })
        }

    },[activeMark])

    const getLocationByCoordinates =  (coordinates) => {
        try {
            const lat = coordinates[0];
            const long = coordinates[1];
            axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lat},${long}.json?&access_token=pk.eyJ1IjoianNjYXN0cm8iLCJhIjoiY2s2YzB6Z25kMDVhejNrbXNpcmtjNGtpbiJ9.28ynPf1Y5Q8EyB_moOHylw`).then((res) =>
            {
                setPlace(res.data.features[0].place_name)
            });
        } catch (e) {

        }
    }

    const getPersonWithMostAccuracy = () =>{
        const persons = location?.objects.filter(item => item.object === "person");

        persons.sort(function(a, b) {
            return parseFloat(b.accuracy) - parseFloat(a.accuracy);
        })
        return (persons[0]?.accuracy * 100).toFixed(0)
    };

    const getMonth = (value) => {
        // eslint-disable-next-line default-case
        switch (value ){
            case 0: return "January"
            case 1: return "February"
            case 2: return "March"
            case 3: return "April"
            case 4: return "May"
            case 5: return "June"
            case 6: return "July"
            case 7: return "August"
            case 8: return "September"
            case 9: return "October"
            case 10: return "November"
            case 11: return "December"
        }
    }

    return (
        <HomeContainer>
                <MapContainer ref={mapContainer} className="map-container"/>
                <RefreshButton onClick={fetchDetections}>
                    REFRESH
                </RefreshButton>
            {
                location && <Container>
                    <Header>

                    </Header>

                    {
                        loading ? <LoadingContainer><img src="https://comercialtrigo.com/wp-content/themes/comerciatrigoTheme/images/preloader.gif"/></LoadingContainer> :<><DivContainerRow >

                            <InputContainer>
                                <Text>
                                    Dron:
                                </Text>
                                <Text ml="10px" black>
                                    R2D2
                                </Text>
                            </InputContainer>
                            <InputContainer/>
                        </DivContainerRow>
                            <DivContainerRow>
                                <InputContainer>
                                    <Text>
                                        Date:
                                    </Text>
                                    <Text ml="10px" black>
                                        {
                                            getMonth( new Date(location?.createdAt).getMonth() ) + " "+ new Date(location?.createdAt).getDate()
                                        }
                                    </Text>
                                </InputContainer>
                                <InputContainer>
                                    <Text>
                                        Hour:
                                    </Text>
                                    <Text ml="10px" black>
                                        {new Date(location?.createdAt).getHours() + ":" + new Date(location?.createdAt).getMinutes()}hs
                                    </Text>
                                </InputContainer>
                            </DivContainerRow>
                            <DivContainerRow>
                                <InputContainer>
                                    <Text>
                                        Longitude:
                                    </Text>
                                    <Text ml="10px" black>
                                        {location?.location.longitude.toFixed(4)}
                                    </Text>
                                </InputContainer>
                                <InputContainer>
                                    <Text>
                                        Latitude:
                                    </Text>
                                    <Text ml="10px" black>
                                        {location?.location.latitude.toFixed(4)}
                                    </Text>
                                </InputContainer>
                            </DivContainerRow>
                            <DivContainerRow>
                                <InputContainer full>
                                    <Text>
                                        Ubication:
                                    </Text>
                                    <Text ml="10px" black>
                                        {
                                            place
                                        }
                                    </Text>
                                </InputContainer>
                            </DivContainerRow>
                            <DivContainerRow>
                                <InputContainer full>
                                    <Text>
                                        Accuracy:
                                    </Text>
                                    <Text ml="10px" black>
                                        {getPersonWithMostAccuracy()}%
                                    </Text>
                                </InputContainer>
                            </DivContainerRow>
                            <ImageContainer>
                                <Image src={ `data:image/jpeg;base64,${location?.image}`} />
                            </ImageContainer></>
                    }


                </Container>
            }

        </HomeContainer>
    );
}

