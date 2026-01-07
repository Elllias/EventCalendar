import {FC} from 'react';
import {Calendar} from "antd";
import {IEvent} from "../model/IEvent";
import {formatDate} from "../utils/formatDate";

interface EventCalendarProps {
    events: IEvent[]
}

const EventCalendar: FC<EventCalendarProps> = ({events}) => {

    const cellRender = (date: Date) => {
        const formatedDate = formatDate(date);
        const currentUserEvents = events.filter((event) => event.date === formatedDate);

        return (
            <div>{currentUserEvents.map((event, index) =>
                <div key={index}>{event.description}</div>)}
            </div>
        );
    }

    return (
        <Calendar
            cellRender={(date, info) => cellRender(date.toDate())}
        />
    );
};

export default EventCalendar;
