module.exports.register = function(app, MongoClient, uri) {

    const BASE_API = "/api/v1";

    app.get(BASE_API + '/apartments/docs', (req, res) => {
        res.redirect('https://documenter.getpostman.com/view/5884846/UVktqDLb');
    });

    var db;

    MongoClient.connect(uri, (err, client) => {
        if (err) {
            console.error('Error in database connection: ' + err);
            process.exit(1);
        } else {
            db = client.db('gdsin2122-08-db').collection('occupancy-tourist-apartments');
        }
    });

    var initialApartments = [
        {
            "country":"spain",
            "year":2021,
            "travellers":1124194,
            "stays":4042291,
            "avg":3.6
        },
        {
            "country":"germany",
            "year":2021,
            "travellers":33873,
            "stays":182339,
            "avg":5.4
        },
        {
            "country":"france",
            "year":2021,
            "travellers":63315,
            "stays":265877,
            "avg":4.2
        },
        {
            "country":"italy",
            "year":2021,
            "travellers":24218,
            "stays":99513,
            "avg":4.1
        },
        {
            "country":"spain",
            "year":2020,
            "travellers":657997,
            "stays":2297619,
            "avg":3.5
        },
        {
            "country":"germany",
            "year":2020,
            "travellers":14482,
            "stays":94185,
            "avg":6.5
        },
        {
            "country":"france",
            "year":2020,
            "travellers":31636,
            "stays":150946,
            "avg":4.8
        },
        {
            "country":"italy",
            "year":2020,
            "travellers":12597,
            "stays":42684,
            "avg":3.4
        },
        {
            "country":"spain",
            "year":2019,
            "travellers":1259807,
            "stays":4006280,
            "avg":3.2
        },
        {
            "country":"germany",
            "year":2019,
            "travellers":80972,
            "stays":422085,
            "avg":5.2
        },
        {
            "country":"france",
            "year":2019,
            "travellers":112860,
            "stays":416544,
            "avg":3.7
        },
        {
            "country":"italy",
            "year":2019,
            "travellers":84479,
            "stays":247478,
            "avg":2.9
        },
        {
            "country":"spain",
            "year":2018,
            "travellers":1112291,
            "stays":3607509,
            "avg":3.2
        },
        {
            "country":"germany",
            "year":2018,
            "travellers":78258,
            "stays":441734,
            "avg":5.6
        },
        {
            "country":"france",
            "year":2018,
            "travellers":100449,
            "stays":404170,
            "avg":4.0
        },
        {
            "country":"italy",
            "year":2018,
            "travellers":69829,
            "stays":217192,
            "avg":3.1
        }
    ];

    // GET Initial collection
    app.get(BASE_API + "/apartments/loadInitialData", (req, res) => {
        console.info("New GET request to /loadInitialData");
        db.find({}).toArray((err, apartments) => {
            if (err) {
                console.error("Error getting data from DB: " + err);
                res.sendStatus(500);
            } else if (apartments.length == 0) {
                console.info("Adding initial apartments to empty DB");
                db.insertMany(initialApartments);
                res.sendStatus(201);
            } else {
                console.info("Connected to the DB with " + apartments.length + " apartments");
            }
        });
    });

    function formatApartments (apartments) {
        return apartments.map((apartment) => {
            delete apartment._id // removes the property
            return apartment;
        });
    }

    // GET a collection
    app.get(BASE_API + "/apartments", (req, res) => {
        console.info("New GET request to /apartments");
        db.find({}).toArray((err, apartments) => {
            if (err) {
                console.error("Error getting data from DB: " + err);
                res.sendStatus(500);
            } else {
                var formattedApartments = formatApartments(apartments);
                console.debug("Sending apartments: " + JSON.stringify(formattedApartments, null, 2));
                res.send(formattedApartments);
            }
        });
    });

    // POST over a collection
    app.post(BASE_API + "/apartments", (req, res) => {
        var newApartments = req.body;
        if (Object.keys(newApartments).length === 0) {
            console.warn("New POST request to /apartments/ without apartment, sending 400...");
            res.sendStatus(400); //bad request
        } else {
            console.info("New POST request to /apartments with body: " + JSON.stringify(newApartments, null, 2));
            if (!newApartments.country || !newApartments.year) {
                console.warn("The apartment " + JSON.stringify(newApartments, null, 2) + " is not well-formed, sending 422...");
                res.sendStatus(422); // unprocessable entity
            } else {
                db.find({ "country": newApartments.country, "year": newApartments.year }).toArray((err, apartments) => {
                    if (err) {
                        console.error("Error getting data from DB: " + err);
                        res.sendStatus(500);
                    } else {
                        if (apartments.length > 0) {
                            console.warn("The apartment " + JSON.stringify(newApartments, null, 2) + " already exists, sending 409...");
                            res.sendStatus(409); // conflict
                        } else {
                            console.debug("Adding apartment " + JSON.stringify(newApartments, null, 2));
                            db.insertOne(newApartments);
                            res.sendStatus(201); // created
                        }
                    }
                });
            }
        }
    });

    // PUT over a collection
    app.put(BASE_API + "/apartments", (req, res) => {
        console.warn("New PUT request to /apartments, sending 405...");
        res.sendStatus(405); // method not allowed
    });

    // DELETE over a collection
    app.delete(BASE_API + "/apartments", (req, res) => {
        console.info("New DELETE request to /apartments");
        db.deleteMany({}, (err, result) =>{
            if (err) {
                console.error('Error removing data from DB');
                res.sendStatus(500); // internal server error
            } else {
                var deletedCount = result.deletedCount;
                if (deletedCount === 0) {
                    console.warn("There are no apartments to delete");
                    res.sendStatus(404); // not found
                } else {
                    console.debug("All the apartments (" + deletedCount + ") have been succesfully deleted, sending 204...");
                    res.sendStatus(204); // no content
                }
            }
        });
    });

    // GET a specific resource
    app.get(BASE_API + "/apartments/:country/:year", (req, res) => {
        var country = req.params.country;
        var year = parseInt(req.params.year);
        if (!country || !year) {
            console.warn("New GET request to /apartments/:country/:year without country and/or year, sending 400...");
            res.sendStatus(400); // bad request
        } else {
            console.info(`New GET request to /apartments/${country}/${year}`);
            db.find({ "country": country, "year": year }).toArray((err, filteredApartments) => {
                if (err) {
                    console.error('Error getting data from DB');
                    res.sendStatus(500); // internal server error
                } else {
                    if (filteredApartments.length > 0) {
                        var apartment = formatApartments(filteredApartments)[0]; //since we expect to have exactly ONE apartment with this name
                        console.debug("Sending apartment: " + JSON.stringify(apartment, null, 2));
                        res.send(apartment);
                    } else {
                        console.warn(`There are not any apartment with ${country} and ${year}`);
                        res.sendStatus(404); // not found
                    }
                }
            });
        }
    });

    // DELETE a specific resource
    app.delete(BASE_API + "/apartments/:country/:year", (req, res) => {
        var country = req.params.country;
        var year = parseInt(req.params.year);
        if (!country || !year) {
            console.warn("New DELETE request to /apartments/:country without country and/or years, sending 400...");
            res.sendStatus(400); // bad request
        } else {
            console.info(`New DELETE request to /apartments/${country}/${year}`);
            db.deleteOne({ "country": country, "year": year }, (err, filteredApartments) => {
                if (err) {
                    console.error('Error getting data from DB');
                    res.sendStatus(500); // internal server error
                } else {
                    var deletedCount = filteredApartments.deletedCount;
                    if (deletedCount === 1) {
                        console.debug("The rural has been succesfully deleted, sending 204...");
                        res.sendStatus(204); // no content
                    } else {
                        console.warn("There are no contacts to delete");
                        res.sendStatus(404); // not found
                    }
                }
            });
        }
    });

    // PUT over a specific resource
    app.put(BASE_API + "/apartments/:country/:year", (req, res) => {
        var country = req.params.country;
        var year = parseInt(req.params.year);
        var updatedApartment = req.body;
        if (!country || !year) {
            console.warn("New PUT request to apartments/:country/:year without country and/or year, sending 400...");
            res.sendStatus(400); // bad request
        } else if (!updatedApartment) {
            console.warn("New PUT request to apartments/ without rural, sending 400...");
            res.sendStatus(400); // bad request
        } else {
            console.info(`New PUT request to apartments/${country}/${year} with data ` + JSON.stringify(updatedApartment, null, 2));
            if (!updatedApartment.country || !updatedApartment.year) {
                console.warn("The rural " + JSON.stringify(updatedApartment, null, 2) + " is not well-formed, sending 422...");
                res.sendStatus(422); // unprocessable entity
            } else {
                console.log('3'); //BORRAR!
                db.find({ "country": country, "year": year }).toArray((err, apartment) => {
                    if (err) {
                        console.error('Error getting data from DB');
                        res.sendStatus(500); // internal server error
                    } else {
                        if (apartment.length > 0) {
                            db.updateOne({ "country": country, "year": year }, {$set: updatedApartment});
                            console.debug(`Modifying apartment with ${country} and ${year} with data ` + JSON.stringify(updatedApartment, null, 2));
                            res.send(updatedApartment); // return the updated apartment
                        } else {
                            console.warn(`There are not any apartment with ${country} and ${year}`);
                            res.sendStatus(404); // not found
                        }
                    }
                });
            }
        }
    });

}