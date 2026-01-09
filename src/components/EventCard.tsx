import {Card} from "antd";
import {Event} from "../model/Event";

type EventCardProps = {
    event: Event
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
