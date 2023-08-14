import Cookies from 'js-cookie';
import React, { useEffect, useState, useReducer } from 'react';

const LocationFlag = ({ vacation }) => {
    const [loading, setLoading] = useState(true)
    const [dataVar, setDataVar] = useState([])
    const [dataReturned, setDataReturned] = useState(false)
    const [sectionStyle, setSectionStyle] = useState()
    //var sectionStyle 

    useEffect(() => {
        let api_url = `https://restcountries.com/v3.1/name/${vacation.location}?fullText=true`

        fetch(api_url)
            .then(resp => resp.json())
            .then(data => {
                //SORT DATA RETURNED
                console.log('data: ', data)
                setDataVar(data)
                setDataReturned(true)
            })
            .catch(e => console.log(e))
    }, [])
    useEffect(() => {
        if (dataVar !== []) {
            if (dataReturned) {
                setLoading(false)
                setSectionStyle({
                    width: "100%",
                    height: "150px",
                    backgroundImage: "url(" + dataVar[0].flags.png + ")",
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                })
            }            
        }
    }, [dataVar])    

    //`https://flagcdn.com/w20/${dataVar[0].cca2.toLowerCase()}.png`
    //dataVar[0].flags.png
    if (!loading) {
        return (
            <>
                <div                    
                    style={sectionStyle}>
                </div>
            </>
        );
    }
    else {
        return (
            <div>
                {vacation.location} Flag
            </div>
        );
    }
        
};

export default LocationFlag; 