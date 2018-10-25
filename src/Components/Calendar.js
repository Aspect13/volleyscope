import React from "react";
import BigCalendar, {momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import Grid from "../../node_modules/@material-ui/core/Grid/Grid";
import CustomToolbar from "./CustomToolbar";
import Button from "../../node_modules/@material-ui/core/es/Button/Button";
import Paper from "../../node_modules/@material-ui/core/es/Paper/Paper";
import Typography from "../../node_modules/@material-ui/core/es/Typography/Typography";
import './Calendar.css';
import Link from "react-router-dom/es/Link";
import Tooltip from "../../node_modules/@material-ui/core/es/Tooltip/Tooltip";

// import 'react-big-calendar/lib/css/react-big-calendar.css';

// BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));
const styles = {
    height: 'calc(100% - 80px)',
    padding: '8px',
    // display: 'inline-table',
    overflowY: 'auto',
};

const CustomMonthHeader = props => {

    const {date, localizer, format, label} = props;
    return (
        <Paper square>
            {/*<Button secondary onClick={() => console.log(props)}>props {label}</Button>*/}
            <Typography
                variant='subheading'
                noWrap
                style={{userSelect: 'none'}}
            >
                {localizer.format(date, format) || label}
            </Typography>
        </Paper>
    )
};

const CustomMonthDateHeader = props => {
    const {label, isOffRange, onDrillDown, date, drilldownView} = props;
        // {/*<Button variant='raised' color='secondary' onClick={() => console.log(props)}>props</Button>*/}
    const handleClick = event => !isOffRange && onDrillDown(event);
    return (
        /*
        <div
            // style={{
                // backgroundColor: isOffRange ? '#90A4AE' : 'inherit',
                // borderBottom: '2px inset',
                // borderLeft: '1px inset',
                // borderRight: '1px inset',
                // padding: '10% 10% 60% 60%',
                // border: '1px inset #90A4AE61',
                // cursor: isOffRange ? 'initial' : 'pointer',
            // }}
            // className='rbc-date-cell'
            // square
            // elevation={0}
            // onClick={() => !isOffRange && console.log(props)}
        >
        */
            // <Link to={`/#${label}`} style={{textDecoration: 'none'}}>

                <Typography
                    // variant={isOffRange ? '' : 'body1'}
                    variant="display1"
                    noWrap
                    style={{
                        userSelect: 'none',
                        // color: isOffRange && '#c1d5e0',
                        cursor: isOffRange ? 'initial' : 'pointer',
                    }}
                    onClick={handleClick}
                >
                    {label}
                </Typography>
            // </Link>
        // </div>
    )
};

const CustomMonthEvent = props => {
    const {title,}= props;
    const {desc, }= props.event;
    return (
            <Tooltip title={desc || ''}>
                <Typography
                    variant='body1'
                    onClick={() => {
                        console.log(props);
                    }}
                    // color='textPrimary'
                    style={{color: 'inherit'}}
                >
                    {title}
                </Typography>
            </Tooltip>
    )
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
        {
            id: 13,
            title: 'tst13',
            start: new Date(2018, 7, 26, 14, 30),
            end: new Date(2018, 7, 26, 15, 0),
            desc: 'test',
        },
        {
            id: 14,
            title: 'tst14',
            start: new Date(2018, 7, 26, 14, 30),
            end: new Date(2018, 7, 26, 15, 0),
            desc: 'test123',
        },
        {
            id: 15,
            title: 'tst15',
            start: new Date(2018, 7, 26, 14, 30),
            end: new Date(2018, 7, 26, 15, 0),
            desc: 'test456',
        },
        {
            id: 16,
            title: 'tst16',
            start: new Date(2018, 7, 28, 14, 30),
            end: new Date(2018, 7, 29, 15, 0),
            desc: 'test456',
        },
        {
            id: 17,
            title: 'tst17',
            start: new Date(2018, 7, 31, 14, 30),
            end: new Date(2018, 7, 31, 15, 0),
            desc: 'test456',
        },
        {
            id: 18,
            title: 'tst18',
            start: new Date(2018, 7, 26, 14, 30),
            end: new Date(2018, 7, 26, 18, 0),
            desc: 'test789',
        },
        {
            id: 19,
            title: 'tst19',
            start: new Date(2018, 7, 25, 14, 30),
            end: new Date(2018, 7, 26, 11, 0),
            desc: 'test000',
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
                tooltipAccessor={null}
                timeslots={6}
                step={10}
                selectable
                resizeable
                // culture={'ru-RU'}
                components={{
                    toolbar: CustomToolbar,
                    // month?: {
                    //     header?: ReactClass<any>,
                    //     dateHeader?: ReactClass<any>,
                    //     event?: ReactClass<any>
                    // }
                    month: {
                        header: CustomMonthHeader,
                        dateHeader: CustomMonthDateHeader,
                        event: CustomMonthEvent,
                    }
                }}
                // elementProps={{
                //     style: {display: 'flex'},
                //     className: 'QQQQ'
                // }},

            />
        </Grid>
    )
};

export default Calendar;