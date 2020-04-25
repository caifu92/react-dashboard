import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

import MainLogo from './MainLogo';

export const CenteredForm = ({ formTitle, showLogo, children }) => {
  return (

    <FormWrapper container direction="column" justify="center" alignItems="center"
    >
      {showLogo && (
        <ImageWrapper>
          <MainLogo />
        </ImageWrapper>
      )}
      {formTitle && (
        <h2>
          {formTitle}
        </h2>
      )}
      {children}
    </FormWrapper>

  );
};

CenteredForm.propTypes = {
  formTitle: PropTypes.string,
  showLogo: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

const FormWrapper = styled(Grid)({
  height: '100vh',
});

const ImageWrapper = styled(Box)({
  marginBottom: 55,
});
