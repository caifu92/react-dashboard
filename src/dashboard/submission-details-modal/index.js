import React from 'react';
import PropTypes from 'prop-types';
import PassDetails from './pass-details';
import Dialog from '@material-ui/core/Dialog';
import { Close } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

import styles from './submission-details-modal.module.css';

// Sorry for using withStyles and CSS Modules in the same component
// I started with CSS Modules, but I could not change the Dialog's border radius using CSS Modules
const materialStyles = {
  rootStyle: {
    borderRadius: 8,
  },
};

const SubmissionDetailsModal = ({ rapidPass, open, handleClose, classes }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={true}
      maxWidth="md"
      aria-labelledby="RapidPass Submission Details"
      aria-describedby="Pass Detailed Information"
      classes={{
        paper: classes.rootStyle,
      }}
    >
      <div>
        <PassDetails
          rapidPass={rapidPass}
          renderCloseButton={
            <div className={styles.closeButtonWrapper} onClick={handleClose}>
              <Close />
            </div>
          }
        />
      </div>
    </Dialog>
  );
};

SubmissionDetailsModal.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool,
};

SubmissionDetailsModal.defaultProps = {
  open: true,
};

export default withStyles(materialStyles)(SubmissionDetailsModal);
