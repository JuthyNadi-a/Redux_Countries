import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { Container, Row, Col, Button , Spinner } from 'react-bootstrap';

import './CountriesSingle.css';

const CountriesSingle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const country = location.state.country;
  const [weather, setWeather] = useState('')
  const [error, setError] = useState(false)
  const [borderCountries, setBorderCountries] = useState([]);
  const [loading, setLoading] = useState()
 
  useEffect(() => {
    const getWeather = async () => {
      try {
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&unitsmetric&appid=${process.env.REACT_APP_API_KEY_WEATHERAPP}`);
        setWeather(res.data);
        if (country.borders && country.borders.length > 0) {
          setBorderCountries(country.borders);
        }
      } catch (error) {
        setError(true);
        console.log(error.response);
      } finally {
        setLoading(false);
      }
    };
    getWeather();
  }, [country.capital, country.borders]);

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
    <Container className='single-container'>
      <Row>
        <Col>
          <Button variant='light' onClick={()=> navigate('/countries')}><i className="bi bi-arrow-left"></i></Button>
        </Col>
      </Row>
      <Row className='m-5'>
        <Col>
        {' '}
        {country.flags && (
          <Card.Img src={country.flags.svg} alt={country.flags.alt}/>
        )}
        </Col>
        <Col>
        <h2 className='display-4'>{country.name.common}</h2>
        <ul className="my-4 flex flex-col items-start justify-start gap-2 text-slate-700 dark:text-gray-400 list">
          <li>Capital: {country.capital[0]}</li>
          <li>Region: {country.region}</li>
          {!error && weather && (
              <div>
                <p>
                  Right now it is {parseInt(weather.main.temp)} degrees in {country.capital} and {weather.weather[0].description}.
                </p>
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description}/>
              </div>
          )}
        </ul>
        <div>
            <div>
              <strong>Border&nbsp;Countries:&nbsp;</strong>
              {borderCountries.map((border, i) => (
                <Button key={i} variant='light' className='m-2' onClick={() => navigate(`/countries/${border.toLowerCase()}`, { state: { country: border } })}>{border}</Button>
              ))}
            </div>
        </div>
        </Col>
      </Row>
      
    </Container>
  );
};

export default CountriesSingle;
