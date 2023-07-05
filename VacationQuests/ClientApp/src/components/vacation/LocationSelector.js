import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Dropdown from 'react-bootstrap/Dropdown';

const LocationSelector = ({ location, locationFound }) => {

    const [selected, setSelected] = useState('Select a country')
    const [countries, setCountries] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        let api_url = 'https://restcountries.com/v3.1/all?fields=name'

        fetch(api_url)
            .then(resp => resp.json())
            .then(data => {
                //SORT DATA RETURNED
                setCountries(data)
            })
            .catch(e => console.log(e))
    }, []);

    const selectCountry = () => {
        if (selected != 'Select a country') {
            location(selected)
            locationFound(true)
        }
        else {
            setError('Must Select a country')
        }
    }
    
    return (
        <>
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <h3 className='text-danger'>{ error }</h3>
                <div className='mt-5'>
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            { selected }
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                countries.map((country) => (
                                    <Dropdown.Item onClick={() => { setSelected(country.name.common); console.log(selected) }}> {country.name.common}</Dropdown.Item>
                                ))
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className='btn btn-primary mt-5' onClick={() => { selectCountry(); } }> Select Country</div>
            </div>
        </>
    );
};

export default LocationSelector; 