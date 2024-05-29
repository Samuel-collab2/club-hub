import Image from "next/image";
import styled from "styled-components";
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

const EventCard = ( { event } ) => {
    const path = "/event/" + event.id

    return (
        <Card >
            <div id="card">
                <div id="img-container">
                    <a href= {path} >
                        <Image
                            src={event.banner}
                            alt="banner"
                            width={500}
                            height={300}
                            id="event-image"
                            />
                    </a>

                </div>
                <div id="text-container">
                    <div >
                        <a href= {path} >
                            <h2 className="event-text"> {event.name} </h2>
                        </a>
                        <h3 className="event-text" id="club-title"> Host: { event.clubName } </h3>
                    </div>

                    <div className="icon-div">
                        <CalendarTodayOutlinedIcon className="icon"></CalendarTodayOutlinedIcon>
                        <p className="icon-p"> 
                            { new Date(event.dateTime).toUTCString().slice(0, -7) } 
                        </p>
                    </div>

                    <div className="icon-div">
                        <PeopleAltOutlinedIcon className="icon"></PeopleAltOutlinedIcon>
                        <p className="icon-p"> 
                            { event.participantsCount } 
                        </p>
                    </div>
                </div>
            </div>
        </Card>
        
    )
}

// display: grid;
// grid-template-columns: 1fr 1fr;
// gap: 30px;
// max-height: 300px;

// @media (max-width: 768px) {
//   grid-template-columns: 1fr;
//   margin-bottom: 600px;
// }
const Card = styled.div`
    div > a {
        text-decoration: none !important;
        color: black;
    }

    #card {
        display: grid;
        grid-template-rows: 60% 40%;
        margin: 0 10px 0 10px;
        // background-color:red;
        height: 265px;
        width: 240px;
    }

    #img-container {
        height: 100%;
        width: 100%;
        grid-row: 1;
        // background-color:blue;
        // object-fit: contain;
    }

    #text-container {
        grid-row: 2;
        // background-color:green;
        object-fit: contain;
    }

    #event-image {
        // object-fit: fill;
        width: 100%;
        height: 100%;
        border-radius: 25px;
        // box-shadow: 5px 3px 1 0px 5px rgba(0, 0, 0, 0.1);
    }

    .event-text {
        margin: 0px;
    }

    #club-title {
        margin: 0px;
        font-size: 1em;
    }

    .icon {
        margin: 0 5px 0 0;
    }

    .icon-div {
        display:flex; 
        flex-direction: row;
        padding: 3px 0 0 0;
    }

    .icon-p {
        margin: 5px 0 0 0;
    }
`;

export default EventCard