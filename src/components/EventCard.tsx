import {Card, Row} from "antd";
import {IEvent} from "../model/IEvent";

export interface EventCardProps {
    event: IEvent
}

export const EventCard = ({event}: EventCardProps) => {
    return (
        <Card>
            <Row>
                <li>
                    <ol>Date: {event.date}</ol>
                    <ol>Description: {event.description}</ol>
                    <ol>Guest: {event.guest}</ol>
                </li>
            </Row>
        </Card>
    )
}
