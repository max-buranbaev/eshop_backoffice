export function createCustomReport(startDate, endDate) {
    return {
        type: "CREATE_CUSTOM_REPORT",
        createItem: {
            url: `/api/stat/`,
            data: {
                dateStart: startDate,
                dateEnd: endDate
            }
        }
    }
}

export function createWeeklyReport() {
    return {
        type: "CREATE_WEEKLY_REPORT",
        createItem: {
            url: `/api/stat/weekly`
        }
    }
}