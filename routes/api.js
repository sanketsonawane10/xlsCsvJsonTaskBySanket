
const xlsApiController = require('../http/controllers/xlsApiController');


function initApi(app) {

    // get list all books
    app.get('/get-book-list', xlsApiController().getBookList);

    // this is for quick seacrh with url query string
    app.get('/get-book-detail', xlsApiController().getBookDetail);

    // this is for quick seacrh with url params string
    app.get('/get-book-detail/:book', xlsApiController().getBookDetail);

}

module.exports = initApi;