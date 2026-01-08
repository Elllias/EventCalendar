import {Card} from "antd";
import {IEvent} from "../model/IEvent";

export interface EventCardProps {
    event: IEvent
}

export const EventCard = ({event}: EventCardProps) => {
    return (
        <Card>
            <li>
                <ol>Description: {event.description}</ol>
                <ol>Guest: {event.guest}</ol>
            </li>
        </Card>
    )
}
