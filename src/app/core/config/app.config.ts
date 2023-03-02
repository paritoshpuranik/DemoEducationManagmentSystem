import { environment } from 'src/environments/environment';

interface AppConfig {
    endPoints: any;
    routes: any;
    baseUrl: string;
}

export const AppConfig: AppConfig = {
    endPoints: {
        auth: {
           login: 'users' 
        },
        menu: {
            getMenus: 'menu ',
        },
        users: {
            getAllUser: 'users',
            createUser: 'users'
        },
        leavesManagement: {
            getLeavesOfStaff: 'listOfLeaveStaff',
            getLeavesOfStaffForApproval :'listStaffApproval',
            updateStatusOfLeaves: 'listStaffApproval',
            applyForLeaves: 'listOfLeaveStaff'
        },
        staffManagement: {
            getStaffDetails: 'listOfStaff',
            createStaff: 'listOfStaff',
            deleteStaff: 'listOfStaff'
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
