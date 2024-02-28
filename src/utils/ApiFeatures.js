
export class ApiFeatures {
    constructor(mongooseQuery, searchQuery) {
        this.mongooseQuery = mongooseQuery
        this.searchQuery = searchQuery
    }
    pagination() {
        // if NaN then it's a string NaN=false
        if (this.searchQuery.page <= 0) this.searchQuery.page = 1
        let pageNumber = this.searchQuery.page * 1 || 1
        this.pageNumber=pageNumber
        let pagelimit = 8
        let pageSkip = (pageNumber - 1) * pagelimit
        this.mongooseQuery.skip(pageSkip).limit(pagelimit)
        //function chain
        return this
    }

    sort() {
        if (this.searchQuery.sort) {
            let sortBy = this.searchQuery.sort.split(',').join(' ')
            this.mongooseQuery.sort(sortBy)
            return this
        }
    }
    fields() {
        if (this.searchQuery.fields) {
            let fields = this.searchQuery.fields.split(',').join(' ')
            this.mongooseQuery.select(fields)
        }
        return this
    }

    search() {
        if (this.searchQuery.keyword) {
            this.mongooseQuery.find({
                $or: [
                    { title: { $regex: this.searchQuery.keyword } },
                    { description: { $regex: this.searchQuery.keyword } },
                ]
            })
        }
        return this
    }

    filter() {
        let filterObj = { ...this.searchQuery }
        let excludedFields = ['page', 'sort', 'fields', 'keyword']

        excludedFields.forEach(val => {
            delete filterObj[val]
        })

        filterObj = JSON.stringify(filterObj)
        filterObj = filterObj.replace(/(gt|gte|lt|lte)/g, (match) => '$' + match)
        filterObj = JSON.parse(filterObj)
        this.mongooseQuery.find(filterObj)
        return this
    }
}