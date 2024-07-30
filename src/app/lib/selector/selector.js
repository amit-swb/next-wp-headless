import { createSelector } from 'reselect';

const selectAdminState = (state) => state.admin;
const selectCompanyState = (state) => state.company;
const selectEmployeeState = (state) => state.employee;
const selectHrState = (state) => state.hr;

// selectors for admin state
export const selectAdminData = createSelector(
    [selectAdminState],
    (admin) => ({
        error: admin.error,
        isLoggedIn: admin.isLoggedIn,
        loading: admin.loading,
        admin: admin.admin,
    })
);
// selectors for employee state
export const selectEmployeeData = createSelector(
    [selectEmployeeState],
    (employee) => ({
        error: employee.error,
        isLoggedIn: employee.isLoggedIn,
        loading: employee.loading,
        employee: employee.employee,
        allemployeesbyID: employee.allemployeesbyID,
    })
);
// selectors for hr state
export const selectHrData = createSelector(
    [selectHrState],
    (hr) => ({
        error: hr.error,
        isLoggedIn: hr.isLoggedIn,
        loading: hr.loading,
        hr: hr.hr,
        allHrbyID: hr.allHrbyID,
    })
);

// selectors for company state
export const selectCompanyData = createSelector(
    [selectCompanyState],
    (company) => ({
        company: company.company,
        allcompany: company.allcompany,
        singlecompany: company.singlecompany,
    })
);

export const selectCompanyError = createSelector(
    [selectCompanyState],
    (company) => company.error
);

export const selectCompanyLoading = createSelector(
    [selectCompanyState],
    (company) => company.loading
);

// Selectors for company and Admin State
export const selectCompanyOrAdminData = createSelector(
    [selectCompanyData, selectAdminData],
    (companyData, adminData) => {
        if (companyData && companyData.company.user) {
            return companyData;
        } else if (adminData && adminData.admin) {
            return adminData;
        }
        return null; // Return null if neither companyData nor adminData is valid
    }
);