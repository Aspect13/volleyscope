import Toolbar from "react-big-calendar/lib/Toolbar";
import KeyboardArrowLeft from "../../node_modules/@material-ui/icons/KeyboardArrowLeft";
import Today from "../../node_modules/@material-ui/icons/Today";
import KeyboardArrowRight from "../../node_modules/@material-ui/icons/KeyboardArrowRight";
import DateRange from "../../node_modules/@material-ui/icons/DateRange";
import ViewWeek from "../../node_modules/@material-ui/icons/ViewWeek";
import ViewDay from "../../node_modules/@material-ui/icons/ViewDay";
import ViewAgenda from "../../node_modules/@material-ui/icons/ViewAgenda";
import Button from "../../node_modules/@material-ui/core/Button/Button";
import Grid from "../../node_modules/@material-ui/core/Grid/Grid";
import Typography from "../../node_modules/@material-ui/core/Typography/Typography";
import React from "react";


export default class CustomToolbar extends Toolbar {
    navigations = [
        {action: 'PREV', label: 'back', leftIcon: <KeyboardArrowLeft/>},
        {action: 'TODAY', label: 'today', leftIcon: <Today />},
        {action: 'NEXT', label: 'next', rightIcon: <KeyboardArrowRight/>},
    ];

    viewIcons = {
        month: <DateRange />,
        week: <ViewWeek />,
        day: <ViewDay />,
        agenda: <ViewAgenda/>,
    };

    navigationButtons = this.navigations.map((item, index) => (
        <Button
            type="button"
            key={index}
            onClick={() => this.navigate(item.action)}
            color='primary'
        >
            {item.leftIcon && item.leftIcon}
            {item.label && item.label}
            {item.rightIcon && item.rightIcon}
        </Button>
    ));

    viewButtons = () => this.props.views.map((item, index) => (
        <Button
            type='button'
            key={index}
            onClick={() => this.view(item)}
            color='secondary'
            variant={this.props.view === item ? 'outlined' : 'flat'}
        >
            {this.viewIcons[item]}
            {item}
        </Button>
    ));

    render() {
        const {label} = this.props;
        return (
            <Grid
                item
                xs={12}
                className='rbc-toolbar'
                container
                // style={styles}
                direction='row'
                justify='space-around'
                // justify='space-between'
            >
                <Grid
                    item
                    xs={12}
                    sm
                    className="rbc-btn-group"
                    style={{textAlign: 'center'}}
                >
                    {this.navigationButtons}
                    {/*<Button onClick={() => console.log(this.props)}>props</Button>*/}
                    {/*<Button onClick={() => console.log(this.viewButtons())}>views</Button>*/}
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm
                    style={{textAlign: 'center'}}
                >
                    <Typography
                        variant='title'
                        // variant='subheading'
                        // variant='caption'
                        className="rbc-toolbar-label"
                    >
                        {label}
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm
                    className="rbc-btn-group"
                    // style={{textAlign: 'end'}}
                    style={{textAlign: 'center'}}
                >
                    {this.viewButtons()}
                </Grid>
            </Grid>
        );
    }

    navigate = action => {
        console.log('toolbar action', action);
        this.props.onNavigate(action);
    };

    view = viewName => {
        console.log('Toolbar view', viewName);
        this.props.onViewChange(viewName);
    };
}