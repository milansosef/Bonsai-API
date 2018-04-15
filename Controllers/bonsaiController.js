var bonsaiController = function (Bonsai) {
    var post = function (req, res) {

        if(req.body.constructor === Object && Object.keys(req.body).length === 0){
            res.status(400).send('Fill in all the fields');
        } else {
            var bonsai = new Bonsai(req.body);
            bonsai.save();

            res.status(201).send(bonsai);
        }
    };

    var get = function (req, res) {

        var query = {};

        if(req.query.species)
        {
            query.species = req.query.species;
        }
        Bonsai.find(query, function(err,bonsais){
            if(err) {
                res.status(500).send(err);
            }
            else {

                var returnBonsais = [];

                bonsais.forEach(function(element, index, array){
                    var newBonsai = element.toJSON();
                    newBonsai._links = {};
                    newBonsai._links.self = {href: "http://" + req.headers.host + "/api/bonsais/" + newBonsai._id};
                    returnBonsais.push(newBonsai);
                });

                let start = parseInt(req.params.start);
                let limit = parseInt(req.params.limit);
                const total = returnBonsais.length;

                let currentItems = function (total, start, limit) {
                     if (!limit) {
                         return total;
                     } else {
                        return limit;
                     }
                }

                let numberOfPages = function (total, start, limit) {
                    if (!limit){
                        return 1;
                    } else{
                        return Math.ceil(total / limit);
                    }
                }

                let currentPage = function (total, start, limit) {
                    if(!start) {
                        return 1;
                    } else if (!limit) {
                        return 2;
                    } else {
                        return (start + (limit -1) / limit);
                    }
                }

                let getFirstQueryString = function (total, start, limit) {
                    if(!limit) {
                        return "" 
                    } else {

                    }
                }

                let getLastQueryString = function (total, start, limit) {
                    if(!limit) {
                        return "" 
                    } else {
                        
                    }
                }

                let getPreviousQueryString = function (total, start, limit) {

                }

                let getNextString = function (total, start, limit) {

                }

                res.json({
                    items: returnBonsais,
                    _links: {self: {href: "http://" + req.headers.host + "/api/bonsais"}},
                    pagination: {
                        currentPage: currentPage(),
                        currentItems: currentItems(),
                        totalPages: numberOfPages(),
                        totalItems: total,
                        _links: {
                            first: {
                                page: 1,
                                href: "http://" + req.headers.host + "/api/bonsais"
                            },
                            last: {
                                page: numberOfPages(),
                                href: "http://" + req.headers.host + "/api/bonsais"
                            },
                            previous: {
                                page: 1,
                                href: "http://" + req.headers.host + "/api/bonsais"
                            },
                            next: {
                                page: 1,
                                href: "http://" + req.headers.host + "/api/bonsais"
                            }
                        }
                    }
                });
            }
        });
    };

    return {
        post: post,
        get: get
    }
};

module.exports = bonsaiController;