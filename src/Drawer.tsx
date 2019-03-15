import React from 'react';
import classNames from 'classnames';
import { makeStyles, useTheme, getThemeProps } from '@material-ui/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { NavLink } from 'react-router-dom';
import { fade } from '@material-ui/core/styles/colorManipulator';

const drawerWidth = 240;

const useMenuItemStyles = makeStyles(theme => ({
    selected: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.getContrastText(theme.palette.primary.main),
    },
    root: {
        '&:hover': {
            backgroundColor: fade(theme.palette.primary.light, 0.35),
            color: theme.palette.primary.dark,
        }
    }
}), { withTheme: true, index: 1000000 });

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        background: theme.palette.primary.main,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    //   appBarShift: {
    //     marginLeft: drawerWidth,
    //     width: `calc(100% - ${drawerWidth}px)`,
    //     transition: theme.transitions.create(['width', 'margin'], {
    //       easing: theme.transitions.easing.sharp,
    //       duration: theme.transitions.duration.enteringScreen,
    //     }),
    //   },
    menuButton: {
        marginLeft: 4,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing.unit * 7.5,
    },
    list: {
        // backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.main,
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        minHeight: '48px !important',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
}), { withTheme: true, index: 1000000 });

function MiniDrawer(props: any) {
    const classes = useStyles();
    const itemClasses = useMenuItemStyles();
    console.log(classes);
    const [open, setOpen] = React.useState(false);

    function toggleDrawer() {
        setOpen(!open);
    }

    function handleDrawerClose() {
        setOpen(false);
    }

    return (
        <div className={`${classes.root}`}>
            <CssBaseline />
            <AppBar
                position="fixed"
                elevation={0}
                className={classNames(classes.appBar, {
                    //   [classes.appBarShift]: open,
                })}
            >
                <Toolbar disableGutters={true} variant='dense'>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={toggleDrawer}
                        className={classNames(classes.menuButton, {
                            //   [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" noWrap>
                        Mini variant drawer
          </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                color='primary'
                className={classNames(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                }) + ' app-drawer'}
                classes={{
                    paper: classNames(classes.list, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
                open={open}
            >
                <div className={classes.toolbar}>
                    {/* <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton> */}
                </div>
                <Divider />
                <List className={classes.list}>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        // @ts-ignore
                        <ListItem className={classNames(itemClasses.root)} button component={NavLink} key={text} to={`/${text.toLowerCase()}`} activeClassName={classNames(itemClasses.selected)}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon color='inherit' />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {props.children}
            </main>
        </div>
    );
}

export default MiniDrawer;