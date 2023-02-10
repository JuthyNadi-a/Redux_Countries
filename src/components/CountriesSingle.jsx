import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Image, Button , Spinner} from 'react-bootstrap';

const CountriesSingle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const country = location.state.country;
  const [weather, setWeather] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState()
  
  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&unitsmetric&appid=${process.env.REACT_APP_API_KEY_WEATHERAPP}`)
    .catch((error) => {
      setError(true)
      console.log(error.response)
    })
    .then((res)=> {
      setWeather(res.data)
      setLoading(false)
    })
  })
  if(loading) {
    return (
      <Col className='text-center m-5'>
      <Spinner>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
      </Col>
    )
  }
  return (
    <Container>
      <Row className='m-5'>
        <Col>
        {' '}
          <Image thumbnail src={`https://source.unsplash.com/featured/1600x900?${country.flag.svg}`}/>
        </Col>
        <Col>
        <h2 className='display-4'>{country.name.common}</h2>
        <h3>{country.capital}</h3>
        </Col>
        {!error && weather && (
          <div>
            <p>
              Right now it is {parseInt(weather.main.temp)} degrees in {country.capital} and {weather.weather[0].description}.
            </p>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description}/>
          </div>
        )}
      </Row>
      <Row>
        <Col>
          <Button variant='light' onClick={()=> navigate('/countries')}>Back to countries</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CountriesSingle;
