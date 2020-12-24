

const json2xls = require('json2xls');
const fs = require('fs');
const fetch = require("node-fetch");
const jsonexport = require('jsonexport');

function xlsApiController() {

    return {

        getBookList(req, res) {

            const bookListUrl = "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=TksNM2M74TpFR0qWf5HLpsienG2K3UNo";

            fetch(`${bookListUrl}`)
                .then((res) => {
                    return res.json();
                }).then((jsonData) => {
                    ///////////// json to xlsx /////////////////////
                    const xls = json2xls(jsonData.results.books);
                    fs.writeFileSync('data.xlsx', xls, 'binary');
                    res.send("data inserted in xls");
                }).catch((err) => {
                    console.log(err);
                });

        },

        getBookDetail(req, res) {

            const bookDetailUrl = "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=TksNM2M74TpFR0qWf5HLpsienG2K3UNo";

            fetch(bookDetailUrl)
                .then((res) => { return res.json() })
                .then((json) => {

                    let newArr = [];

                    for (let i = 0; i < json.results.books.length; i++) {

                        newArr.push(json.results.books[i].title);

                        const bookName = req.query.book.toUpperCase();

                        if (bookName == newArr[i] || bookName == newArr[i]) {
                            ///////////// json to csv /////////////////////
                            const stats = json.results.books[i];
                            jsonexport(stats, function (err, csv) {
                                if (err) return console.error(err);
                                console.log(csv);
                                fs.writeFileSync('file.csv', csv);
                            });

                            console.log("Successfully seacrhed for book name");
                            return res.json(json.results.books[i]);

                        }

                    }
                    console.log("You have entered wrong book name");
                    return res.json("You have entered wrong book name");

                }).catch((err) => {
                    console.log(err);

                })
        }
    }

}

module.exports = xlsApiController;