import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton';
import SplitButton from 'react-bootstrap/SplitButton';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


const LocationSelector = ({ location, locationFound }) => {

    const [selected, setSelected] = useState('Select a country')
    const [countries, setCountries] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        //let api_url = 'https://restcountries.com/v3.1/all?fields=name'
        let api_url = 'https://restcountries.com/v3.1/all?'

        fetch(api_url)
            .then(resp => resp.json())
            .then(data => {
                //SORT DATA RETURNED
                console.log('data: ', data)
                sortCountriesByName(data)
            })
            .catch(e => console.log(e))
    }, []);

    //useEffect(() => {
    //    if (countries) {
    //    }
    //}, [countries]);

    const selectCountry = () => {
        if (selected != 'Select a country' && selected != '') {
            location(selected)
            locationFound(true)
        }
        else {
            setError('Must Select a country')
        }
    }

    const sortCountriesByName = (data) => {
        const sortedCountries = [...data].sort((a, b) => {
            const nameA = a.name.common.toUpperCase();
            const nameB = b.name.common.toUpperCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });

        setCountries(sortedCountries);
        console.log(sortedCountries)
    };

    return (
        <>
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <h3 className='text-danger'>{error}</h3>
                <div className='d-flex justify-content-center mt-5 w-100'>
                    {/*<Dropdown className='col-5 mx-auto'>*/}
                    {/*    <DropdownButton*/}
                    {/*        drop={'down-centered'}*/}
                    {/*        variant="secondary"*/}
                    {/*        title={selected}*/}
                    {/*    >*/}
                    {/*        <Dropdown.Item>*/}
                    {/*            <div className='wrapper'>*/}
                    {/*                <input type="text" className="form-control input" placeholder="Search for Country" />*/}
                    {/*                <i class="bi bi-search icon"></i>*/}
                    {/*            </div>*/}
                    {/*        </Dropdown.Item>*/}
                    {/*        {*/}
                    {/*            countries.map((country) => (*/}
                    {/*                <Dropdown.Item className='text-center mx-auto' onClick={() => { setSelected(country.name.common) }}> {country.name.common}</Dropdown.Item>*/}
                    {/*            ))*/}
                    {/*        }*/}
                    {/*    </DropdownButton>*/}
                    {/*</Dropdown>*/}
                    <div className='card bg-light'>
                        <div className="card-header"> Select a desired country</div>
                        <div className="card-body">
                            <Autocomplete
                                id="country-select-demo"
                                sx={{ width: 300 }}
                                options={countries}
                                onInputChange={(event, newInputValue) => {
                                    setSelected(newInputValue);
                                }}
                                autoHighlight
                                getOptionLabel={(option) => option.name.common}
                                renderOption={(props, option) => (
                                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                        <img
                                            loading="lazy"
                                            width="20"
                                            src={`https://flagcdn.com/w20/${option.cca2.toLowerCase()}.png`}
                                            srcSet={`https://flagcdn.com/w40/${option.cca2.toLowerCase()}.png 2x`}
                                            alt=""
                                        />
                                        {option.name.common}
                                    </Box>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Choose a country"
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                        }}
                                    />
                                )}
                            />
                        </div>
                    </div>
                </div>
                <div className='btn btn-primary mt-5 col-4' onClick={() => { selectCountry(); }}> Select Country</div>
            </div>
        </>
    );
};

export default LocationSelector; 