import Image from "next/image";
import styled from "styled-components";
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

const EventCard = ( { event } ) => {
    const path = "/event/" + event.id
    const eventName = event.name;
    // Use titleCondition to change event tile size to better fit inside card based on title character length
    const titleCondition = eventName.length <= 17 ? true: false;

    return (
        <Card >
            <div id="card">
                <div id="img-container">
                    <a href= {path} >
                        <Image
                            src={event.banner ? /assets/placeholder-image.jpg : "/default-event-banner.jpg"}
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
                            {titleCondition && 
                                <h2 className="event-text"> {event.name} </h2>
                            }
                            {!titleCondition && 
                                <h3 className="event-text"> {event.name} </h3>
                            }

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