const models = require('../../models/index');

module.exports = {
    getPagedDataSortedByPublishedAt: async function (page, limit) {
        try {
            return await models.Video.find()
                .sort({ publishedAt: -1 })
                .skip(limit * (page - 1))
                .limit(limit)
                .lean();
        } catch (error) {
            console.log(error);
            throw new Error(`Error in getting data from db : ${error.message}`);
        }
    },

    getFilteredData: async function (titleRegex, descriptionRegex) {
        var query = {};
        if (titleRegex) query['title'] = { $regex: titleRegex, $options: 'ig' };
        if (descriptionRegex)
            query['description'] = { $regex: descriptionRegex, $options: 'ig' };
        try {
            return await models.Video.find(query).lean();
        } catch (error) {
            console.log(error);
            throw new Error(`Error in getting data from db : ${error.message}`);
        }
    },
};
