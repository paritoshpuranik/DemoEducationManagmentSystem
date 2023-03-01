import { environment } from 'src/environments/environment';

interface AppConfig {
    endPoints: any;
    routes: any;
    baseUrl: string;
}

export const AppConfig: AppConfig = {
    endPoints: {
        auth: {
            
        },
        menu: {
            getMenus: '/assets/json/menu.json',
        },
        users: {
            getAllUser: '/assets/json/user.json',
        },
        leavesManagement: {
            getLeavesOfStaff: '/assets/json/list-of-leaves-staff.json',
            getLeavesOfStaffForApproval :'/assets/json/list-staff-approval.json'
        },
        staffManagement: {
            getStaffDetails: '/assets/json/list-of-staff.json'
        }
    },
    routes: {
        auth: {
            login: 'login',
            registration: 'register',
        },
        modules: {
            dashboard: 'dashboard',
            staffManagement: 'staff-management',
            leaveManagement: 'leave-management'
        }
    },
    baseUrl: environment.apiUrl,
};
