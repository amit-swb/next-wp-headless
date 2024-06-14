import { createSelector } from 'reselect';

const selectAdminState = (state) => state.admin;
const selectCompanyState = (state) => state.company;

// electors for admin state
export const selectAdminData = createSelector(
    [selectAdminState],
    (admin) => ({
        error: admin.error,
        isLoggedIn: admin.isLoggedIn,
        loading: admin.loading,
        admin: admin.admin,
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
        if (companyData && companyData.company) {
            return companyData;
        } else if (adminData && adminData.admin) {
            console.log("adminData",adminData)
            return adminData;
        }
        return null; // Return null if neither companyData nor adminData is valid
    }
);