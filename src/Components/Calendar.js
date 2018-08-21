import React from "react";
import BigCalendar, {momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import Grid from "../../node_modules/@material-ui/core/Grid/Grid";
import CustomToolbar from "./CustomToolbar";

// BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));
const styles = {
    height: 'calc(100% - 80px)',
    padding: '8px',
};



const Calendar = () => {
    const events = [
        {
            id: 6,
            title: 'Meeting',
            start: new Date(2018, 3, 12, 10, 30, 0, 0),
            end: new Date(2018, 3, 12, 12, 30, 0, 0),
            desc: 'Pre-meeting meeting, to prepare for the meeting',
        },
        {
            id: 7,
            title: 'Lunch',
            start: new Date(2018, 3, 12, 12, 0, 0, 0),
            end: new Date(2018, 3, 12, 13, 0, 0, 0),
            desc: 'Power lunch',
        },
        {
            id: 8,
            title: 'Meeting',
            start: new Date(2018, 3, 12, 14, 0, 0, 0),
            end: new Date(2018, 3, 12, 15, 0, 0, 0),
        },
        {
            id: 9,
            title: 'Happy Hour',
            start: new Date(2018, 3, 12, 17, 0, 0, 0),
            end: new Date(2018, 3, 12, 17, 30, 0, 0),
            desc: 'Most important meal of the day',
        },
        {
            id: 10,
            title: 'Dinner',
            start: new Date(2018, 3, 12, 20, 0, 0, 0),
            end: new Date(2018, 3, 12, 21, 0, 0, 0),
        },
        {
            id: 11,
            title: 'Volleyball',
            start: new Date(2018, 7, 16, 20, 30),
            end: new Date(2018, 7, 16, 22, 0),
            desc: 'Play volleyball',
        },
        {
            id: 12,
            title: 'Volleyball2',
            start: new Date(2018, 7, 16, 21, 30),
            end: new Date(2018, 7, 16, 23, 0),
            desc: 'Play volleyball',
        },

    ];

    return (
        <Grid
            container
            style={styles}
            direction='column'
        >
            <BigCalendar
                // view='week'
                popup
                events={events}
                localizer={momentLocalizer(moment)}
                // defaultDate={new Date()}
                timeslots={6}
                step={10}
                selectable
                resizeable
                // culture={'ru-RU'}
                components={{
                    toolbar: CustomToolbar
                }}
            />
        </Grid>
    )
};

export default Calendar;