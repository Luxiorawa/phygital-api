const WebsiteService = require('./../Services/WebsiteService')

exports.getWebsiteIndex = async (req, res) => {
    console.log('Entering Website Controller')
    let indexFile = await WebsiteService.readIndexFile()
    return res.end(indexFile.toString())
}
