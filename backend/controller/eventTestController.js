const rabbitmq = require('../events/landingPage/updateAboutUs.js')

exports.updateAboutUs = async (req, res) => {
    await rabbitmq.updateAboutUs(req, res);
    return res;

}