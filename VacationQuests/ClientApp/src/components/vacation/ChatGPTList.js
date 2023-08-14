import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import MapIcon from '@mui/icons-material/Map';
import SendIcon from "@mui/icons-material/Send";
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Modal from 'react-bootstrap/Modal';
import GoogleMaps from "./GoogleMaps";
import Tooltip from '@mui/material/Tooltip';
import { useReducer } from "react";

const spdActions = [
    { icon: <FormatListNumberedIcon />, name: "Suggest a location" },
    //{ icon: <SelfImprovementIcon />, name: "Relaxing areas" },
    { icon: <MapIcon />, name: "Look at map" },
];

const gptResponse =
{
    "response": [
        "South Africa: Pietermaritzburg - Offers historic buildings, botanical gardens, and access to the Drakensberg Mountains.",
        "Japan: Kanazawa - Offers traditional neighborhoods, samurai districts, and beautiful Kenrokuen Garden.",
        "Sweden: Lund - Known for Lund University, botanical gardens, and its charming medieval town center.",
        "Italy: Bari - Offers historic old town, coastal landscapes, and access to the Trulli of Alberobello.",
        "Canada: Hamilton - Offers waterfalls, historic sites, and cultural festivals.",
        "Thailand: Ayutthaya - Offers ancient ruins, historic temples, and a UNESCO World Heritage Site.",
        "Spain: Salamanca - Known for its historic university, beautiful Plaza Mayor, and Renaissance architecture.",
        "South Korea: Daegu - Offers historic sites, traditional markets, and access to scenic areas like Apsan Park.",
        "Australia: Hobart - Offers access to Tasmania's natural beauty, historic sites, and cultural events.",
        "Mexico: San Miguel de Allende - Offers colonial charm, art galleries, and a lively arts scene.",
        "Germany: Nuremberg - Offers medieval architecture, historic landmarks like Nymphenburg Palace, and a vibrant arts scene.",
        "Portugal: Porto - Known for its historic Ribeira district, port wine cellars, and stunning Douro River views.",
        "South Africa: Durban - Offers warm beaches, a diverse cultural scene, and a mix of Indian and African influences.",
        "Japan: Nagasaki - Offers historic sites related to its atomic bomb history, beautiful landscapes, and unique cultural heritage.",
        "Sweden: Gothenburg - Offers a charming waterfront, historic districts, and cultural institutions like Liseberg amusement park.",
        "Italy: Milan - Known for its fashion, art, and cultural attractions like the Milan Cathedral and Leonardo da Vinci's 'The Last Supper.'",
        "Canada: Ottawa - The capital city known for its historic Parliament Hill, museums, and the Rideau Canal.",
        "Thailand: Phuket - Offers beautiful beaches, water activities, and a lively nightlife scene.",
        "Spain: Valencia - Offers futuristic architecture, a beautiful old town, and the City of Arts and Sciences complex.",
        "South Korea: Incheon - Known for its modern developments, Incheon International Airport, and Chinatown.",
        "Australia: Adelaide - Known for its wine regions, cultural festivals, and historic architecture.",
        "Mexico: Oaxaca - Offers indigenous culture, colonial architecture, and vibrant traditional markets.",
        "Germany: Munich - Known for Oktoberfest, historic landmarks like Nymphenburg Palace, and a vibrant arts scene.",
        "Portugal: Algarve - Offers stunning coastline, sandy beaches, and golf resorts.",
        "South Africa: Port Elizabeth - Known for its beaches, wildlife reserves, and access to the Garden Route.",
        "Japan: Fukuoka - Offers a blend of modernity and tradition, including historic shrines and bustling shopping districts.",
        "Sweden: Malmö - Offers a mix of modern architecture, historic sites, and a diverse food scene.",
        "Italy: Naples - Offers historic sites like Pompeii, vibrant street life, and authentic Neapolitan pizza.",
        "Canada: Calgary - Known for the Calgary Stampede, access to the Rocky Mountains, and cultural attractions.",
        "Thailand: Pattaya - Offers beaches, water sports, and a variety of entertainment options.",
        "Spain: Bilbao - Known for the Guggenheim Museum, Basque cuisine, and the historic Old Town.",
        "South Korea: Jeju Island - Known for its natural beauty, volcanic landscapes, and UNESCO-listed sites.",
        "Australia: Perth - Offers beaches, outdoor activities, and a vibrant arts and culinary scene.",
        "Mexico: Puebla - Offers colonial architecture, historic churches, and traditional cuisine.",
        "Germany: Hamburg - Known for its maritime history, vibrant nightlife, and cultural diversity.",
        "Portugal: Sintra - Offers fairy-tale palaces, historic estates, and scenic landscapes.",
        "South Africa: Bloemfontein - Known for its cultural institutions, gardens, and historic architecture.",
        "Japan: Sapporo - Offers a blend of urban life and access to ski resorts, hot springs, and the Sapporo Snow Festival.",
        "Sweden: Uppsala - Offers historic sites like Uppsala Cathedral, a prestigious university, and botanical gardens.",
        "Italy: Genoa - Offers historic maritime heritage, charming alleys, and cultural attractions.",
        "Canada: Edmonton - Offers West Edmonton Mall, cultural festivals, and access to outdoor activities.",
        "Thailand: Krabi - Offers stunning limestone cliffs, beaches, and access to nearby islands.",
        "Spain: Zaragoza - Offers historic architecture, including the Basilica of Our Lady of the Pillar, and cultural festivals.",
        "South Korea: Gyeongju - Known as the 'Museum Without Walls,' offers ancient temples, tombs, and historical sites.",
        "Australia: Canberra - The capital city known for its museums, galleries, and political landmarks.",
        "Mexico: Mérida - Offers colonial architecture, vibrant markets, and access to Mayan archaeological sites.",
        "Germany: Dresden - Offers baroque architecture, historic landmarks, and art museums.",
        "Portugal: Coimbra - Offers one of the oldest universities in Europe, historic libraries, and a charming old town.",
        "South Africa: Pretoria - The administrative capital known for historic landmarks, gardens, and cultural attractions.",
        "Japan: Sendai - Known for its modern cityscape, historic sites, and access to Matsushima Bay, one of Japan's Three Views.",
        "Sweden: Visby - A UNESCO-listed medieval town on Gotland Island, known for its historic walls and cobblestone streets.",
        "Italy: Palermo - Offers a blend of cultures, historic sites like Palermo Cathedral, and vibrant street markets.",
        "Canada: Winnipeg - Offers cultural institutions, historic sites, and a diverse arts scene.",
        "Thailand: Chiang Rai - Offers unique temples like the White Temple and access to the Golden Triangle region.",
        "Spain: Córdoba - Known for the Mezquita, a mosque-turned-cathedral, and its historic Jewish Quarter.",
        "South Korea: Daejeon - Known for its scientific institutions, technology parks, and cultural attractions.",
        "Australia: Darwin - Offers access to Kakadu National Park, diverse wildlife, and Aboriginal culture.",
        "Mexico: Tulum - Offers stunning Mayan ruins by the sea, cenotes, and a bohemian atmosphere.",
        "Germany: Cologne - Offers a historic cathedral, museums, and vibrant events like the Cologne Carnival.",
        "Portugal: Braga - Known for religious sites, historic architecture, and a mix of tradition and modernity.",
        "South Africa: Pietermaritzburg - Offers historic buildings, botanical gardens, and access to the Drakensberg Mountains.",
        "Japan: Kanazawa - Offers traditional neighborhoods, samurai districts, and beautiful Kenrokuen Garden.",
        "Sweden: Lund - Known for Lund University, botanical gardens, and its charming medieval town center.",
        "Italy: Bari - Offers historic old town, coastal landscapes, and access to the Trulli of Alberobello.",
        "Canada: Hamilton - Offers waterfalls, historic sites, and cultural festivals.",
        "Thailand: Ayutthaya - Offers ancient ruins, historic temples, and a UNESCO World Heritage Site.",
        "Spain: Salamanca - Known for its historic university, beautiful Plaza Mayor, and Renaissance architecture.",
        "South Korea: Daegu - Offers historic sites, traditional markets, and access to scenic areas like Apsan Park.",
        "Australia: Hobart - Offers access to Tasmania's natural beauty, historic sites, and cultural events.",
        "Mexico: San Miguel de Allende - Offers colonial charm, art galleries, and a lively arts scene.",
        "Germany: Nuremberg - Offers medieval architecture, historic landmarks like Nymphenburg Palace, and a vibrant arts scene.",
        "Portugal: Porto - Known for its historic Ribeira district, port wine cellars, and stunning Douro River views.",
        "South Africa: Durban - Offers warm beaches, a diverse cultural scene, and a mix of Indian and African influences.",
        "Japan: Nagasaki - Offers historic sites related to its atomic bomb history, beautiful landscapes, and unique cultural heritage.",
        "Sweden: Gothenburg - Offers a charming waterfront, historic districts, and cultural institutions like Liseberg amusement park.",
        "Italy: Milan - Known for its fashion, art, and cultural attractions like the Milan Cathedral and Leonardo da Vinci's 'The Last Supper.'",
        "Canada: Ottawa - The capital city known for its historic Parliament Hill, museums, and the Rideau Canal.",
        "Thailand: Phuket - Offers beautiful beaches, water activities, and a lively nightlife scene.",
        "Spain: Valencia - Offers futuristic architecture, a beautiful old town, and the City of Arts and Sciences complex.",
        "South Korea: Incheon - Known for its modern developments, Incheon International Airport, and Chinatown.",
        "Australia: Adelaide - Known for its wine regions, cultural festivals, and historic architecture.",
        "Mexico: Oaxaca - Offers indigenous culture, colonial architecture, and vibrant traditional markets.",
        "Germany: Munich - Known for Oktoberfest, historic landmarks like Nymphenburg Palace, and a vibrant arts scene.",
        "Portugal: Algarve - Offers stunning coastline, sandy beaches, and golf resorts.",
        "South Africa: Port Elizabeth - Known for its beaches, wildlife reserves, and access to the Garden Route.",
        "Japan: Fukuoka - Offers a blend of modernity and tradition, including historic shrines and bustling shopping districts.",
        "Sweden: Malmö - Offers a mix of modern architecture, historic sites, and a diverse food scene.",
        "Italy: Naples - Offers historic sites like Pompeii, vibrant street life, and authentic Neapolitan pizza.",
        "Canada: Calgary - Known for the Calgary Stampede, access to the Rocky Mountains, and cultural attractions.",
        "Thailand: Pattaya - Offers beaches, water sports, and a variety of entertainment options.",
        "Spain: Bilbao - Known for the Guggenheim Museum, Basque cuisine, and the historic Old Town.",
        "South Korea: Jeju Island - Known for its natural beauty, volcanic landscapes, and UNESCO-listed sites.",
        "Australia: Perth - Offers beaches, outdoor activities, and a vibrant arts and culinary scene.",
        "Mexico: Puebla - Offers colonial architecture, historic churches, and traditional cuisine.",
        "Germany: Hamburg - Known for its maritime history, vibrant nightlife, and cultural diversity.",
        "Portugal: Sintra - Offers fairy-tale palaces, historic estates, and scenic landscapes.",
        "South Africa: Bloemfontein - Known for its cultural institutions, gardens, and historic architecture.",
        "Japan: Sapporo - Offers a blend of urban life and access to ski resorts, hot springs, and the Sapporo Snow Festival.",
        "Sweden: Uppsala - Offers historic sites like Uppsala Cathedral, a prestigious university, and botanical gardens.",
        "Italy: Genoa - Offers historic maritime heritage, charming alleys, and cultural attractions.",
        "Canada: Edmonton - Offers West Edmonton Mall, cultural festivals, and access to outdoor activities.",
        "Thailand: Krabi - Offers stunning limestone cliffs, beaches, and access to nearby islands.",
        "Spain: Zaragoza - Offers historic architecture, including the Basilica of Our Lady of the Pillar, and cultural festivals.",
        "South Korea: Gyeongju - Known as the 'Museum Without Walls,' offers ancient temples, tombs, and historical sites.",
        "Australia: Canberra - The capital city known for its museums, galleries, and political landmarks.",
        "Mexico: Mérida - Offers colonial architecture, vibrant markets, and access to Mayan archaeological sites.",
        "Germany: Dresden - Offers baroque architecture, historic landmarks, and art museums.",
        "Portugal: Coimbra - Offers one of the oldest universities in Europe, historic libraries, and a charming old town.",
        "South Africa: Pretoria - The administrative capital known for historic landmarks, gardens, and cultural attractions.",
        "Japan: Sendai - Known for its modern cityscape, historic sites, and access to Matsushima Bay, one of Japan's Three Views.",
        "Sweden: Visby - A UNESCO-listed medieval town on Gotland Island, known for its historic walls and cobblestone streets.",
        "Italy: Palermo - Offers a blend of cultures, historic sites like Palermo Cathedral, and vibrant street markets.",
        "Canada: Winnipeg - Offers cultural institutions, historic sites, and a diverse arts scene.",
        "Thailand: Chiang Rai - Offers unique temples like the White Temple and access to the Golden Triangle region.",
        "Spain: Córdoba - Known for the Mezquita, a mosque-turned-cathedral, and its historic Jewish Quarter.",
        "South Korea: Daejeon - Known for its scientific institutions, technology parks, and cultural attractions.",
        "Australia: Darwin - Offers access to Kakadu National Park, diverse wildlife, and Aboriginal culture.",
        "Mexico: Tulum - Offers stunning Mayan ruins by the sea, cenotes, and a bohemian atmosphere.",
        "Germany: Cologne - Offers a historic cathedral, museums, and vibrant events like the Cologne Carnival.",
        "Portugal: Braga - Known for religious sites, historic architecture, and a mix of tradition and modernity.",
        "South Africa: Pietermaritzburg - Offers historic buildings, botanical gardens, and access to the Drakensberg Mountains.",
        "France: Paris - Offers iconic landmarks like the Eiffel Tower, Louvre Museum, and charming Montmartre.",
        "Brazil: Rio de Janeiro - Known for Copacabana Beach, Christ the Redeemer, and vibrant Carnival celebrations.",
        "China: Beijing - Offers the Great Wall, Forbidden City, and a blend of ancient and modern culture.",
        "Russia: St. Petersburg - Known for the Hermitage Museum, historic palaces, and the Neva River.",
        "Kenya: Nairobi - Offers wildlife reserves, Nairobi National Park, and cultural attractions.",
        "Turkey: Istanbul - Known for Hagia Sophia, Blue Mosque, and its unique position spanning two continents.",
        "Argentina: Buenos Aires - Offers tango culture, historic neighborhoods, and vibrant street life.",
        "India: Jaipur - Known for the Amber Fort, Hawa Mahal, and its colorful architecture.",
        "Vietnam: Hanoi - Offers the Old Quarter, Hoan Kiem Lake, and a mix of French colonial heritage.",
        "Greece: Athens - Known for the Acropolis, Parthenon, and its influence on Western civilization.",
        "Egypt: Cairo - Offers the Pyramids of Giza, Egyptian Museum, and historic Islamic architecture.",
        "Peru: Cusco - Known for its Inca heritage, Machu Picchu, and stunning Andean landscapes.",
        "Morocco: Marrakech - Offers vibrant markets, historic medina, and the Jardin Majorelle.",
        "Australia: Sydney - Known for Sydney Opera House, Bondi Beach, and the Sydney Harbour Bridge.",
        "Canada: Vancouver - Offers Stanley Park, Granville Island, and access to the stunning natural landscapes of British Columbia.",
        "Spain: Barcelona - Known for Antoni Gaudí's architecture, La Rambla, and beautiful beaches.",
        "Italy: Florence - Offers Renaissance art, the Uffizi Gallery, and stunning Florence Cathedral.",
        "Japan: Kyoto - Known for traditional temples, Fushimi Inari Shrine, and its preserved historical district.",
        "South Africa: Cape Town - Offers Table Mountain, Robben Island, and a mix of cultures.",
        "Thailand: Bangkok - Known for the Grand Palace, Wat Pho, and bustling street markets.",
        "South Korea: Seoul - Offers ancient palaces, modern shopping districts, and vibrant street food scene.",
        "Mexico: Mexico City - Known for the Zócalo, Chapultepec Park, and a diverse culinary scene.",
        "Sweden: Stockholm - Offers beautiful archipelago, historic Gamla Stan, and innovative design culture.",
        "Netherlands: Amsterdam - Known for its canals, Van Gogh Museum, and vibrant arts scene.",
        "China: Shanghai - Offers futuristic skyline, historic Bund area, and a blend of cultures.",
        "Ireland: Dublin - Offers historic Trinity College, Temple Bar district, and access to stunning Irish landscapes.",
        "France: Lyon - Known for its culinary scene, historic traboules, and Renaissance architecture.",
        "Brazil: Salvador - Offers Afro-Brazilian culture, historic Pelourinho, and beautiful coastline.",
        "Russia: Moscow - Known for Red Square, St. Basil's Cathedral, and iconic Soviet-era landmarks.",
        "Kenya: Maasai Mara - Offers incredible wildlife viewing during the Great Migration and vast savannah landscapes.",
        "Turkey: Cappadocia - Known for its unique rock formations, hot air balloon rides, and underground cities.",
        "Argentina: Patagonia - Offers stunning natural beauty, glaciers, and outdoor activities.",
        "India: Agra - Known for the Taj Mahal, Agra Fort, and Mughal architecture.",
        "Vietnam: Ho Chi Minh City - Offers bustling markets, historic sites like the War Remnants Museum, and street food.",
        "Greece: Santorini - Known for its white-washed buildings, stunning sunsets, and crystal-clear waters.",
        "Egypt: Luxor - Offers ancient temples like Karnak and Luxor, and access to the Valley of the Kings.",
        "Peru: Lima - Known for its culinary scene, historic center, and access to archaeological sites like Pachacamac.",
        "Morocco: Fes - Offers the historic medina, Al Quaraouiyine University, and traditional craftsmanship.",
        "Australia: Melbourne - Known for its arts scene, laneways, and diverse neighborhoods.",
        "Canada: Quebec City - Offers charming Old Town, historic architecture, and French-Canadian culture.",
        "Spain: Seville - Known for the Alcazar, Plaza de España, and flamenco culture.",
        "Italy: Venice - Offers picturesque canals, St. Mark's Square, and unique Venetian architecture.",
        "Japan: Hiroshima - Offers Peace Memorial Park, Hiroshima Peace Memorial, and the iconic A-Bomb Dome.",
        "South Africa: Johannesburg - Offers Apartheid Museum, Soweto township tours, and cultural diversity.",
        "Thailand: Chiang Mai - Known for historic temples, Doi Suthep, and vibrant night markets.",
        "South Korea: Busan - Offers Haeundae Beach, Gamcheon Culture Village, and a blend of modernity and tradition.",
        "Mexico: Guanajuato - Offers colorful architecture, historic alleyways, and the Cervantes Festival.",
        "Sweden: Gotland - Known for its medieval architecture, beautiful coastlines, and Visby's Medieval Week.",
        "Netherlands: Keukenhof Gardens - Offers stunning displays of tulips and other flowers during springtime.",
        "China: Xi'an - Known for the Terracotta Army, ancient city walls, and historic Silk Road connections.",
        "France: Marseille - Offers vibrant Mediterranean culture, Calanques National Park, and historic sites.",
        "Brazil: Iguazu Falls - Offers breathtaking waterfalls on the border of Brazil and Argentina.",
        "Russia: Kazan - Known for its mix of Tatar and Russian culture, Kazan Kremlin, and historic mosques.",
        "Kenya: Mombasa - Offers beautiful beaches, historic Fort Jesus, and Swahili culture.",
        "Turkey: Antalya - Offers Mediterranean beaches, historic old town, and access to ancient ruins.",
        "Argentina: Mendoza - Known for its wine regions, Aconcagua mountain, and outdoor activities.",
        "India: Varanasi - Offers the Ganges River, spiritual rituals, and historic ghats.",
        "Vietnam: Halong Bay - Offers stunning limestone karsts, emerald waters, and unique floating fishing villages.",
        "Greece: Rhodes - Known for its medieval Old Town, ancient ruins, and beautiful beaches.",
        "Egypt: Aswan - Offers the High Dam, Philae Temple, and access to Nubian culture.",
        "Peru: Arequipa - Known for its white volcanic stone architecture, Colca Canyon, and Andean landscapes.",
        "Morocco: Chefchaouen - Offers blue-painted streets, Rif Mountains, and a laid-back atmosphere.",
        "Australia: Brisbane - Offers the South Bank cultural precinct, access to Moreton Bay, and vibrant riverfront.",
        "Canada: Toronto - Known for the CN Tower, diverse neighborhoods, and cultural attractions.",
        "Spain: Granada - Offers the Alhambra Palace, Albaicín neighborhood, and stunning views of the Sierra Nevada.",
        "Italy: Amalfi Coast - Known for its dramatic coastline, charming towns, and Mediterranean views.",
        "Japan: Okinawa - Offers beautiful beaches, coral reefs, and a unique Ryukyuan culture.",
        "South Africa: Knysna - Offers the Knysna Heads, Garden Route beauty, and outdoor activities.",
        "Thailand: Koh Phi Phi - Offers picturesque beaches, snorkeling, and a lively island atmosphere.",
        "South Korea: Sokcho - Offers access to Seoraksan National Park, beautiful beaches, and fresh seafood.",
        "Mexico: Mexico's Riviera Maya - Offers stunning Caribbean beaches, Mayan ruins, and underwater cenotes.",
        "Sweden: Kiruna - Known for the Northern Lights, Icehotel, and Arctic wilderness.",
        "Netherlands: Rotterdam - Offers modern architecture, bustling harbor, and diverse cultural scene.",
        "China: Guilin - Offers picturesque karst landscapes, Li River cruises, and ancient villages.",
        "Ireland: Dublin - Offers historic Trinity College, Temple Bar district, and access to stunning Irish landscapes.",
        "France: Bordeaux - Known for its wine regions, neoclassical architecture, and cultural festivals."

    ]
}


function ChatGPTList({ vacation }) {
    const [buttonOpen, setButtonOpen] = useState(false);
    const handleButtonOpen = () => setButtonOpen(true);
    const handleButtonClose = () => setButtonOpen(false);
    const [response, setResponse] = useState()
    const [gptReponseFound, setGptReponseFound] = useState(false)
    const [events, setEvents] = useState()
    const [eventObjects, setEventObjects] = useState()
    const [showMaps, setShowMaps] = useState()
    const [centerCoord, setCenterCoord] = useState()
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const [showResponse, setShowResponse] = useState(false);

    const handleCloseResponse = () => {
        setShowResponse(false);
        setResponse()
    }
    const handleShowResponse = () => setShowResponse(true);

    const handleCloseMaps = () => {
        setShowMaps(false);
    }
    const handleShowMaps = () => setShowMaps(true);

    function generateRandomNumber(minValue, maxValue) {
        return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    }
    useEffect(() => {
        if (vacation.events) {
            let tempArray = []
            let objectsArray = []
            vacation.events.forEach((event) => {
                fetch(`https://localhost:7259/api/events/${event}`)
                    .then(resp => resp.json())
                    .then(data => {
                        let jsonObject = JSON.parse(data.location)
                        tempArray.push(jsonObject.geometry.location)
                        setEvents(tempArray)

                        setCenterCoord(tempArray[0])
                        console.log("center", centerCoord)

                        data.location = JSON.parse(data.location)
                        objectsArray.push(data)
                        setEventObjects(objectsArray)
                        forceUpdate()
                    })
                    .catch(e => console.log(e))
            })
        }
    }, [])
    useEffect(() => {
        if (events) {
            //console.log('Events', events)
        }
    }, [events])
    useEffect(() => {
        if (response) {
            if (gptReponseFound && response) {
                handleShowResponse()
            }
            else {
                setResponse('DUE TO FUNDING ISSUES CHAT GPT COULDNT LIST GOOD LOCATIONS TO VISIT')
                handleShowResponse()
            }
        }
    }, [response])

    const chatGPTAction = (index) => {
        switch (index) {
            case 0:
                let tempArr = []
                setGptReponseFound(false)
                console.log('CHAT GPT lists top 10 places to visit')
                gptResponse.response.forEach((response) => {
                    if (response.substring(0, response.indexOf(':')).toLowerCase().includes(vacation.location.toLowerCase())) {
                        tempArr.push(response)
                        setGptReponseFound(true)

                    }
                })
                setResponse(tempArr[generateRandomNumber(0, tempArr.length)])


                break;
            case 1:
                console.log('Bring up google maps to vacation area and let them explore: ', events)
                handleShowMaps()
                break;

        }
    }
    const moveCoord = (event) => {
        setCenterCoord(event.location.geometry.location)
        forceUpdate()
    }

    return (
        <>
            <center>
                <div className='bg-secondary'>
                    <SpeedDial
                        ariaLabel="basic"
                        sx={{
                            position: "fixed",
                            bottom: 50,
                            right: 100
                        }}
                        icon={<i className="bi bi-chat"></i>}
                        onClose={handleButtonClose}
                        onOpen={handleButtonOpen}
                        open={buttonOpen}
                    >
                        {spdActions.map((action, index) => (
                            <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                onClick={() => chatGPTAction(index)}
                                tooltipTitle={action.name}
                            />
                        ))}
                    </SpeedDial>
                </div>
            </center>
            {
                response ?
                    <>
                        <Modal
                            animation={false}
                            backdrop='static'
                            size='lg'
                            centered show={showResponse} onHide={handleCloseResponse}>
                            <Modal.Header className='border border-secondary justify-content-center'>
                                <h3 className='text-center'>Chat GPT response</h3>
                                <hr></hr>
                            </Modal.Header>
                            <Modal.Body className=''>
                                {response}
                            </Modal.Body>
                            <Modal.Footer className='border border-secondary'>
                                <div className='d-flex w-100'>
                                    <Button className='m-1 w-100' variant="secondary" onClick={handleCloseResponse}>
                                        Close
                                    </Button>
                                </div>
                            </Modal.Footer>
                        </Modal>
                    </>
                    :
                    <></>
            }
            {
                showMaps ?
                    <>
                        <Modal
                            animation={false}
                            backdrop='static'
                            fullscreen
                            size='lg'
                            centered show={showMaps} onHide={handleCloseMaps}>
                            <Modal.Header className='border border-secondary justify-content-center'>
                                <h3 className='text-center'>Explore the map!</h3>
                                <hr></hr>
                            </Modal.Header>
                            <Modal.Body className='bg-primary'>
                                {
                                    events && eventObjects ?
                                        <center>
                                            <GoogleMaps latVar={centerCoord.lat} lngVar={centerCoord.lng} markers={events} largeMap />
                                            {
                                                eventObjects.length >= 6 ?

                                                    <div className='d-flex flex-row overflow-x-scroll'>
                                                        {
                                                            eventObjects.map((event, index) => (
                                                                <Tooltip title={"Travel too " + event.location.formatted_address } placement="top">
                                                                    <div className='card col-2 p-1 m-1' onClick={() => { moveCoord(event) }}>
                                                                        <div className='card-header'>
                                                                            {event.eventName}
                                                                        </div>
                                                                        <div className='card-body'>{event.location.formatted_address}</div>
                                                                        <div></div>
                                                                    </div>
                                                                </Tooltip>
                                                            ))
                                                        }
                                                    </div>
                                                    :
                                                    <div className='d-flex flex-row'>
                                                        {
                                                            eventObjects.map((event, index) => (
                                                                <div className='card p-1 mx-1'>
                                                                    <div className='card-header'>
                                                                        {event.eventName}
                                                                    </div>
                                                                    <div className='card-body'>{event.location.formatted_address}</div>
                                                                    <div></div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                            }
                                        </center>
                                        :
                                        <><h1 className='text-center'>LOADING</h1></>
                                }
                            </Modal.Body>
                            <Modal.Footer className='border border-secondary'>
                                <div className='d-flex w-100'>
                                    <Button className='m-1 w-100' variant="secondary" onClick={handleCloseMaps}>
                                        Close
                                    </Button>
                                </div>
                            </Modal.Footer>
                        </Modal>
                    </>
                    :
                    <></>
            }
        </>
    );
}

export default ChatGPTList;