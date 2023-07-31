const validator = require('validator');

const ValidateArticle = (params) => {
    let validate_title = !validator.isEmpty(params.title);

    let validate_content = !validator.isEmpty(params.content);

    if(!validate_title || !validate_content) {
        throw new Error('The information could not be validated')
    }
}




module.exports = {
    ValidateArticle
}