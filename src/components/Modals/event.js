import React from "react";
import Dialog from "@material-ui/core/Dialog";
import { Typography } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core";
import { ReactComponent as CloseIcon } from "../../assets/img/closeIcon.svg";

const useStyles = makeStyles({
  customDialogue: {
    "& .MuiDialog-paper": {
      backgroundColor: "#C4C4C4",
    },
  },
  iconContainer: {
    textAlign: "end",
  },
  closeIcon: {
    color: "#000",
    cursor: "pointer",
  },
  customTitle: {
    color: "#B72620",
    textAlign: "center",
    fontFamily: "Montserrat",
    fontWeight: 800,
    fontSize: "48px",
    lineHeight: "59px",
  },
  customText: {
    color: "#B72620",
    textAlign: "center",
    fontFamily: "Montserrat",
    fontWeight: 500,
    fontSize: "24px",
    lineHeight: "29.26px",
    margin: "20px 0px",
  },
});
export default function AlertDialog({ open, handleClose }) {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={classes.customDialogue}
      maxWidth={"lg"}
    >
      <DialogTitle id="alert-dialog-title" className={classes.iconContainer}>
        <CloseIcon className={classes.closeIcon} onClick={handleClose} />
      </DialogTitle>
      <DialogContent style={{ padding: "20px" }}>
        <DialogContentText id="alert-dialog-description">
          <Typography className={classes.customTitle}>
            EVENTS TUTORIAL
          </Typography>
          <Typography className={classes.customText}>
            1. Currently accumulated prize pool for this event! The pool will
            grow when more investors contribute and buys team tokens during the
            sale period.
          </Typography>
          <Typography className={classes.customText}>
            2. Sale will end by this period. Once sales end, team tokens can
            only be bought on DEX. Click on 'Trade on' button to access the page
            to buy those team tokens!
          </Typography>
          <Typography className={classes.customText}>
            3. Use the search to find a team that you'd like to back
          </Typography>
          <Typography className={classes.customText}>
            4. Total Supply will be decided at the end of the event
          </Typography>
          <Typography className={classes.customText}>
            5. Current price will be 1 USDC for the entire sales period
          </Typography>
          <Typography className={classes.customText}>
            6. ROI is not fixed or locked. ROI will change as different team
            tokens get bought up by other investors
          </Typography>
          <Typography className={classes.customText}>
            7. Team tokens can only be traded for long-term events after the
            sales period
          </Typography>
          <Typography className={classes.customText}>
            8. After approving, enter the amount of tokens you'd like to buy,
            and just press on 'Buy' later! Make sure you have enough USDC in
            your wallet.
          </Typography>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
