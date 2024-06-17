import Image from "next/image";
import styled from "styled-components";

const ClubCard = ( { club } ) => {
    const path = "/club/" + club.id

    const clubName = club.name;
    // Use titleCondition to change event tile size to better fit inside card based on title character length
    const titleCondition = clubName.length <= 17 ? true: false;

    return (
        <Card >
            <div id="card">
                <div id="img-container">
                    <a href= {path} >
                        <Image
                            src={club.banner ? club.banner : "/assets/placeholder-image.jpg"}
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
                                <>
                                    <h2 className="event-text"> {clubName} </h2>
                                    <span className="club-room">ClubRoom: <h2 className="event-text room-text"> {club.clubRoom} </h2></span>
                                </>
                            }
                            {!titleCondition && 
                                <>
                                    <h3 className="event-text2"> {clubName} </h3>
                                    <span className="club-room">ClubRoom: <h2 className="event-text room-text"> {club.clubRoom} </h2></span>
                                </>

                            }

                        </a>
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

    .club-room {
        // color: #260fbd;
        font-weight: bold;
    }

    .room-text {
        text-align: left;
        font-size: 1em;
        font-weight: normal;
        // color: #260fbd;
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

    .event-text2 {
        margin: 0px;
        padding-bottom: 5px;
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

export default ClubCard