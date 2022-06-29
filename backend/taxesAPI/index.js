module.exports.register = function (app, MongoClient, uri) {
    const BASE_API = "/api/v1";
    const COLLECTION = "/tax-gdp-ratios"
    const BASE_COLLECTION = BASE_API + COLLECTION

    app.get(BASE_COLLECTION + '/docs', (req, res) => {
        res.redirect('https://documenter.getpostman.com/view/2240004/UVkvJYC7');
    });

    var db;
    MongoClient.connect(uri, (err, client) => {
        if (err) {
            console.error('Error in database connection: ' + err);
            process.exit(1);
        } else {
            db = client.db('gdsin2122-08-db').collection('tax-revenue-to-gdp-ratio');
        }
    });

    // POST over a collection
    app.post(BASE_COLLECTION, (req, res) => {
        var newTax = req.body;
        if (Object.keys(newTax).length === 0) {
            console.warn("New POST request to " + COLLECTION + " without tax, sending 400...");
            res.sendStatus(400); //bad request
        } else {
            console.info("New POST request to " + COLLECTION + " with body: " + JSON.stringify(newTax, null, 2));
            if (!newTax.year || !newTax.country || (newTax.gdp_per_capita == null) || (newTax.total_tax_revenues == null) || (newTax.population == null)) {
                console.warn("The tax " + JSON.stringify(newTax, null, 2) + " is not well-formed, sending 422...");
                res.sendStatus(422); // unprocessable entity
            } else {
                db.findOne({ "country": newTax.country, "year": parseInt(newTax.year) }, (err, tax) => {
                    if (err) {
                        console.error("Error getting data from DB: " + err);
                        res.sendStatus(500);
                    } else {
                        if (tax) {
                            console.warn("The tax " + JSON.stringify(newTax, null, 2) + " already exists, sending 409...");
                            res.sendStatus(409); // conflict
                        } else {
                            console.debug("Adding tax " + JSON.stringify(newTax, null, 2));
                            db.insertOne(newTax);
                            res.sendStatus(201); // created
                        }
                    }
                });
            }
        }
    });

    // PUT over a collection
    app.put(BASE_COLLECTION, (req, res) => {
        console.warn("New PUT request to " + COLLECTION + ", sending 405...");
        res.sendStatus(405); // method not allowed
    });

    function formatTax(taxes) {
        return taxes.map((tax) => {
            delete tax._id
            return tax;
        });
    }
    // GET a collection
    app.get(BASE_COLLECTION, (req, res) => {
        console.info("New GET request to " + COLLECTION);
        db.find({}).toArray((err, taxes) => {
            if (err) {
                console.error("Error getting data from DB: " + err);
                res.sendStatus(500);
            } else if (taxes.length == 0) {
                console.warn("No exist taxes, sending 204...");
                res.sendStatus(204); // conflict
            } else {
                var formattedTaxes = formatTax(taxes);
                console.debug("Sending taxes: " + JSON.stringify(formattedTaxes, null, 2));
                res.status(200);
                res.send(formattedTaxes);
            }
        });
    });

    // DELETE over a collection
    app.delete(BASE_COLLECTION, (req, res) => {
        console.info("New DELETE request to " + COLLECTION);
        db.deleteMany({}, (err, result) => {
            if (err) {
                console.error('Error removing data from DB');
                res.sendStatus(500); // internal server error
            } else {
                var deletedElements = result.deletedCount;
                if (deletedElements === 0) {
                    console.warn("There are no taxes to delete");
                    res.sendStatus(404); // not found
                } else {
                    console.debug("All the taxes (" + deletedElements + ") have been succesfully deleted, sending 204...");
                    res.sendStatus(204); // no content
                }
            }
        });
    });

    // GET a specific resource
    app.get(BASE_COLLECTION + "/:country/:year", (req, res) => {
        var country = req.params.country;
        var year = req.params.year;
        if (!country || !year) {
            var errorMessage = "New GET request to " + COLLECTION;
            errorMessage += (!country ? "/:country without country" : "/:year without year") + " , sending 400..."
            console.warn(errorMessage);
            res.sendStatus(400); // bad request
        } else {
            console.info("New GET request to " + COLLECTION + "/%s/%s", country, year);
            db.findOne({ "country": country, "year": parseInt(year) }, (err, tax) => {
                if (err) {
                    console.error('Error getting data from DB');
                    res.sendStatus(500); // internal server error
                } else {
                    if (tax) {
                        delete tax._id
                        console.debug("Sending tax: " + JSON.stringify(tax, null, 2));
                        res.status(200);
                        res.send(tax);
                    } else {
                        console.warn("There are not any tax with country %s and year %s", country, year);
                        res.sendStatus(404); // not found
                    }
                }
            });
        }
    });

    // POST over a specific resource
    app.post(BASE_COLLECTION + "/:country/:year", (req, res) => {
        console.warn("New POST request to " + COLLECTION + "/:country/:year, sending 405...");
        res.sendStatus(405); // method not allowed
    });

    // PUT over a specific resource
    app.put(BASE_COLLECTION + "/:country/:year", (req, res) => {
        var country = req.params.country;
        var year = req.params.year;
        var updateTax = req.body;
        if (!country || !year) {
            var errorMessage = "New PUT request to " + COLLECTION;
            errorMessage += (!country ? "/:country without country" : "/:year without year") + " , sending 400..."
            console.warn(errorMessage);
            res.sendStatus(400); // bad request
        } else if (Object.keys(updateTax).length === 0) {
            console.warn("New PUT request to " + COLLECTION + " without tax, sending 400...");
            res.sendStatus(400); // bad request
        } else {
            console.info("New PUT request to " + COLLECTION + "/" + country + "/" + year + " with data " + JSON.stringify(updateTax, null, 2));
            if (!updateTax.year || !updateTax.country || (updateTax.gdp_per_capita == null) || (updateTax.total_tax_revenues == null) || (updateTax.population == null)) {
                console.warn("The tax " + JSON.stringify(updateTax, null, 2) + " is not well-formed, sending 422...");
                res.sendStatus(422); // unprocessable entity
            } else {
                db.findOne({ "country": country, "year": parseInt(year) }, (err, tax) => {
                    if (err) {
                        console.error('Error getting data from DB');
                        res.sendStatus(500); // internal server error
                    } else {
                        if (tax) {
                            db.updateOne({ "country": country, "year": parseInt(year) }, { $set: updateTax });
                            console.debug("Modifying tax with country " + country + " and year " + year + " with data " + JSON.stringify(updateTax, null, 2));
                            res.send(updateTax); // return the updated tax
                        } else {
                            console.warn("There are not any tax with country %s and year %s", country, year);
                            res.sendStatus(404); // not found
                        }
                    }
                });
            }
        }
    });

    // DELETE a specific resource
    app.delete(BASE_COLLECTION + "/:country/:year", (req, res) => {
        var country = req.params.country;
        var year = req.params.year;
        if (!country || !year) {
            var errorMessage = "New DELETE request to " + COLLECTION;
            errorMessage += (!country ? "/:country without country" : "/:year without year") + " , sending 400..."
            console.warn(errorMessage);
            res.sendStatus(400); // bad request
        } else {
            console.info("New DELETE request to " + COLLECTION + "/" + country + "/" + year);
            db.deleteOne({ "country": country, "year": parseInt(year) }, function (err, result) {
                if (err) {
                    console.error('Error removing data from DB');
                    res.sendStatus(500); // internal server error
                } else {
                    var deletedElements = result.deletedCount;
                    console.debug("Taxes removed: " + deletedElements);
                    if (deletedElements === 1) {
                        console.debug("The tax with country " + country + " and year " + year + " has been succesfully deleted, sending 204...");
                        res.sendStatus(204); // no content
                    } else {
                        console.warn("There are no taxes to delete");
                        res.sendStatus(404); // not found
                    }
                }
            });
        }
    });

    var initialTaxes = [
        {
            "country": "Spain",
            "year": 2017,
            "gdp_per_capita": 39528.9253872668,
            "total_tax_revenues": 34.585022,
            "population": 46647425
        },
        {
            "country": "Spain",
            "year": 2018,
            "gdp_per_capita": 40312.5475864011,
            "total_tax_revenues": 35.278682,
            "population": 46692863
        },
        {
            "country": "Spain",
            "year": 2019,
            "gdp_per_capita": 40805.9169678996,
            "total_tax_revenues": 35.297445,
            "population": 46736782
        },
        {
            "country": "France",
            "year": 2017,
            "gdp_per_capita": 44577.0645745394,
            "total_tax_revenues": 47.941356,
            "population": 64842513
        },
        {
            "country": "France",
            "year": 2018,
            "gdp_per_capita": 45251.9054105957,
            "total_tax_revenues": 47.740274,
            "population": 64990512
        },
        {
            "country": "France",
            "year": 2019,
            "gdp_per_capita": 45834.1669122703,
            "total_tax_revenues": 47.191743,
            "population": 65129731
        },
        {
            "country": "Italy",
            "year": 2017,
            "gdp_per_capita": 41581.120790548,
            "total_tax_revenues": 42.193631,
            "population": 60673694
        },
        {
            "country": "Italy",
            "year": 2018,
            "gdp_per_capita": 42052.5563822519,
            "total_tax_revenues": 42.01721,
            "population": 60627291
        },
        {
            "country": "Italy",
            "year": 2019,
            "gdp_per_capita": 42662.5223699096,
            "total_tax_revenues": 42.653777,
            "population": 60550092
        },
        {
            "country": "Denmark",
            "year": 2017,
            "gdp_per_capita": 55356.680780178,
            "total_tax_revenues": 46.315122,
            "population": 5732277
        },
        {
            "country": "Denmark",
            "year": 2018,
            "gdp_per_capita": 56281.2888680368,
            "total_tax_revenues": 44.998802,
            "population": 5752131
        },
        {
            "country": "Denmark",
            "year": 2019,
            "gdp_per_capita": 57678.0988930692,
            "total_tax_revenues": 46.702501,
            "population": 5771877
        },
        {
            "country": "Croatia",
            "year": 2017,
            "gdp_per_capita": 26800.118975807,
            "total_tax_revenues": 37.586929,
            "population": 4182846
        },
        {
            "country": "Croatia",
            "year": 2018,
            "gdp_per_capita": 27799.8433225132,
            "total_tax_revenues": 38.249901,
            "population": 4156407
        },
        {
            "country": "Croatia",
            "year": 2019,
            "gdp_per_capita": 28753.5162699607,
            "total_tax_revenues": 38.627472,
            "population": 4130299
        }
    ]

    // GET Initial collection
    app.get(BASE_API + "/tax-gdp-ratios/loadInitialData", (req, res) => {
        console.info("New GET request to /loadInitialData");
        db.find({}).toArray((err, taxes) => {
            if (err) {
                console.error("Error getting data from DB: " + err);
                res.sendStatus(500);
            } else if (taxes.length == 0) {
                console.info("Adding initial taxes to empty DB");
                db.insertMany(initialTaxes);
                res.status(201);
                res.send(initialTaxes);
            } else {
                console.info("Connected to the DB with " + taxes.length + " taxes");
                res.status(200);
                res.send(taxes);
            }
        });
    });
}