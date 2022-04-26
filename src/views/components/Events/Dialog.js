import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from "@material-ui/core/useMediaQuery";


const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
        background: '#333333'
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
        '& :focus': {
            outline: 'none !important'
        }
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                // <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                <CloseIcon className={classes.closeButton} onClick={onClose} />
                // </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        background: '#333333'

    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
        background: '#333333',
        display: 'flex',
        justifyContent: 'center'

    },
}))(MuiDialogActions);

export default function CustomizedDialogs({ metamaskWithMsg, handleClose }) {

    const isMobile = useMediaQuery("(max-width:800px)");

    return (
        <div>

            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={true}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {' '}
                </DialogTitle>
                <DialogContent dividers>

                    <Typography gutterBottom>
                        Please connect your Metamask on BSC for the best experience!
                    </Typography>
                    <br />
                    <Typography gutterBottom>
                        {!isMobile ? 'Make sure you have the Metamask plugin on your browser' :
                            'Make sure you have the Metamask app installed on your mobile, and access the page from the Metamask app!'}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <div className="connect-div" onClick={metamaskWithMsg}>
                        {"Connect Wallet"}
                    </div>

                </DialogActions>
            </Dialog>
        </div>
    );
}
