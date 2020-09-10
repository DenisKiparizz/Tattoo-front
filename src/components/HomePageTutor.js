import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import HourglassEmptySharpIcon from '@material-ui/icons/HourglassEmptySharp';
import AccessibilityNewSharpIcon from '@material-ui/icons/AccessibilityNewSharp';
import TimelineDot from '@material-ui/lab/TimelineDot';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import FlareSharpIcon from '@material-ui/icons/FlareSharp';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '6px 16px',
    },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
    },
    base: {
        width: "1000px",
        paddingBottom: "100px"
    }
}));

export default function CustomizedTimeline() {
    const classes = useStyles();

    return (
        <div>
            <h1 className="home-title-center">How to use this app</h1>
            <Timeline className={classes.base} align="alternate">
                <TimelineItem>
                    <TimelineOppositeContent>
                        1
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot>
                            <VpnKeyIcon/>
                        </TimelineDot>
                        <TimelineConnector/>
                    </TimelineSeparator>
                    <TimelineContent>
                        <Paper elevation={3} className={classes.paper}>
                            <Typography variant="h6" component="h1">
                                Login
                            </Typography>
                            <Typography>If there arent your account you can create this one</Typography>
                        </Paper>
                    </TimelineContent>
                </TimelineItem>

                <TimelineItem>
                    <TimelineOppositeContent>
                        2
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot color="primary">
                            <FlareSharpIcon/>
                        </TimelineDot>
                        <TimelineConnector/>
                    </TimelineSeparator>
                    <TimelineContent>
                        <Paper elevation={3} className={classes.paper}>
                            <Typography variant="h6" component="h1">
                                Choose
                            </Typography>
                            <Typography>Choose your favorite tattoo</Typography>
                        </Paper>
                    </TimelineContent>
                </TimelineItem>

                <TimelineItem>
                    <TimelineOppositeContent>
                        3
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot color="primary" variant="outlined">
                            <AccessibilityNewSharpIcon/>
                        </TimelineDot>
                        <TimelineConnector className={classes.secondaryTail}/>
                    </TimelineSeparator>
                    <TimelineContent>
                        <Paper elevation={3} className={classes.paper}>
                            <Typography variant="h6" component="h1">
                                Add to order
                            </Typography>
                            <Typography>Add tattoo to your order list. Dont forget to select part of body</Typography>
                        </Paper>
                    </TimelineContent>
                </TimelineItem>

                <TimelineItem>
                    <TimelineOppositeContent>
                        4
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot color="secondary">
                            <HourglassEmptySharpIcon/>
                        </TimelineDot>
                    </TimelineSeparator>
                    <TimelineContent>
                        <Paper elevation={3} className={classes.paper}>
                            <Typography variant="h6" component="h1">
                                Waiting
                            </Typography>
                            <Typography>We will contact you shortly</Typography>
                        </Paper>
                    </TimelineContent>
                </TimelineItem>
            </Timeline>
        </div>
    )
}