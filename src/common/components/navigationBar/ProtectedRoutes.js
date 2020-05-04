import { Dashboard } from '../../../dashboard/pages/Dashboard';
import { BulkUpload } from '../../../bulkUpload/BulkUpload';
import { ChangePassword } from '../../../pages/ChangePassword';
import { CheckApplicationStatus } from '../../../dashboard/pages/CheckApplicationStatus';
import { Roles } from '../../constants';

export const PROTECTED_ROUTES = [
  {
    path: '/access-passes',
    exact: true,
    title: 'Applications',
    component: Dashboard,
    show: true,

    // allowedRole: Roles.APPROVER,
  },
  {
    path: '/bulk-upload',
    exact: true,
    title: 'Bulk Upload',
    component: BulkUpload,
    show: true,
    allowedRole: Roles.APPROVER,
  },
  {
    path: '/application-status',
    exact: true,
    title: 'Application Status',
    component: CheckApplicationStatus,
    show: true,
    allowedRole: Roles.SUPPORT,
  },
  {
    path: '/change-password',
    exact: true,
    title: 'Change Password',
    component: ChangePassword,
    show: false,
  },
];
