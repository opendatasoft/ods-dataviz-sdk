class DataProvider {
    constructor(public domainId: string, public datasetId: string) {
        // Empty domainID means local

        // FIXME: Understand why Storybook, when it imports DataProvider, doesn't have the code that has these 2 lines
        // automatically added by the accessors in the signature...
        this.domainId = domainId;
        this.datasetId = datasetId;
    }
}

export default DataProvider;