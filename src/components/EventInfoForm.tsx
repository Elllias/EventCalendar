import {Layout, Row} from "antd";
import {IEvent} from "../model/IEvent";
import {EventCard} from "./EventCard";

export interface EventInfoProps {
    events: IEvent[]
}

export const EventInfoForm = ({events}: EventInfoProps) => {
    return (
        <Layout className="EventInfoForm__event-card-container">
            <div className="h70">
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
            </div>
        </Layout>
    )
}

export default EventInfoForm;
