import "./EventInfoForm.css";
import {Layout, Row} from "antd";
import {Event} from "../../model/Event";
import {EventCard} from "../event-card/EventCard";

type EventInfoProps = {
    events: Event[]
}

export const EventInfoForm = ({events}: EventInfoProps) => {
    return (
        <Layout className="EventInfoForm__event-card-container">
            {events.length > 0
                ? events.map((event) =>
                    <div className="EventInfoForm__event-card">
                        <EventCard event={event}/>
                    </div>
                )
                : <Row justify="center" align="middle" className="EventInfoForm__no-events-row">
                    Нет событий
                </Row>
            }
        </Layout>
    )
}
