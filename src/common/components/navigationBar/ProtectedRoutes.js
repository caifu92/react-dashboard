import { Dashboard } from '../../../dashboard/pages/Dashboard';
import { BulkUpload } from '../../../bulkUpload/BulkUpload';
import { ChangePassword } from '../../../pages/ChangePassword';
import { Roles } from '../../constants';

export const PROTECTED_ROUTES = [
  {
    path: '/access-passes',
    exact: true,
    title: 'Applications',
    component: Dashboard,
    show: true,
    role: Roles.HAS_VIEW_RECORD_STATUS,
  },
  {
    path: '/bulk-upload',
    exact: true,
    title: 'Bulk Upload',
    component: BulkUpload,
    show: true,
    role: Roles.HAS_VIEW_RECORD_STATUS,
  },
  {
    path: '/change-password',
    exact: true,
    title: 'Change Password',
    component: ChangePassword,
    show: false,
    role: Roles.HAS_VIEW_RECORD_STATUS,
  },
];
