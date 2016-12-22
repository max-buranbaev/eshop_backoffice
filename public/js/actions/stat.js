export function createCustomReport(startDate, endDate) {
    return {
        type: "CREATE_CUSTOM_REPORT",
        createItem: {
            url: `/api/stat/`,
            data: {
                startDate: startDate,
                endDate: endDate
            }
        }
    }
}