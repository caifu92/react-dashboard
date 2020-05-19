import React, { forwardRef, useEffect } from 'react';
import MaterialTable from 'material-table';
import { Box, Container, Grid, styled, Typography } from '@material-ui/core';
import AddBox from '@material-ui/icons/AddBox';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import * as R from 'ramda';
import { useSelector } from 'react-redux';
import { useKeycloak } from '@react-keycloak/web';


import { getUserAporTypes } from '../store/slices';
import { useGetAporTypes } from '../common/hooks/useGetAporTypes';
import { useCreateAporType } from '../common/hooks/useCreateAporType';

import { KeycloakRoles } from '../common/constants';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const columns = [
  { title: 'APOR Code', field: 'aporCode' },
  { title: 'Industry', field: 'description' },
  { title: 'Approving Agency', field: 'approvingAgency' },
]
export const AporTypes = () => {
  const { execute } = useCreateAporType();
  const aporTypes = useSelector(getUserAporTypes);
  const { data: aporList, query } = useGetAporTypes();
  const { keycloak } = useKeycloak();
  

  useEffect(() => {
    query();
  }, [query])

  const hasEditable = keycloak.hasRealmRole(KeycloakRoles.HAS_ADD_APOR_TYPE_ACCESS)

  return (
    <Box>
      <Box component="main">
        <StyledFiltersBlock>
          <Container>
            <Grid container spacing={2} justify="space-between">
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Typography variant="caption">
                  You are viewing applications from the following APOR types: &nbsp;
                  <b>{aporTypes.length && aporTypes.join(', ')}</b>
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </StyledFiltersBlock>

        <Box py={3}>
          <Container>
            <MaterialTable
              title="APOR TYPES"
              columns={columns}
              data={R.clone(aporList.list)}
              icons={tableIcons}    
              options={{
                actionsColumnIndex: -1,
                search: false,
                paging: false,
                minBodyHeight: '600px',
                maxBodyHeight: '1000px',
                headerStyle: { position: 'sticky', top: 0 },
              }}
               editable={{
                ...(hasEditable && {onRowAdd: (newData) =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      resolve();
                      execute(newData);
                    }, 600);
                  })})
              }}
            />
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

const StyledFiltersBlock = styled(Box)(({ theme }) => ({
  // ! TODO: use color value from theme
  borderBottom: '1px solid #DDDDDD',
  paddingBottom: theme.spacing(3),
  paddingTop: theme.spacing(4),
}));
