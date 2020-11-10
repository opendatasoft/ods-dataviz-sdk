class DataProvider {
    constructor(public domainId: string, public datasetId: string) {
        // Empty domainID means local
    }
}

export default DataProvider;