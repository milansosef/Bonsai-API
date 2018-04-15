var express = require('express');

var routes = function (Bonsai) {
    var bonsaiRouter = express.Router();

    var bonsaiController = require('../Controllers/bonsaiController')(Bonsai);
    
    bonsaiRouter.route('/')
        .options(function (req,res) {
            res.header('Allow', 'GET,POST,OPTIONS');
            res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
            res.send(200);
        })
        .post(bonsaiController.post)
        .get(bonsaiController.get);
    // Middleware
    bonsaiRouter.use('/:bonsaiId', function (req,res,next) {
        Bonsai.findById(req.params.bonsaiId, function(err,bonsai){
            if(err){
                res.status(500).send(err);
            }
            else if(bonsai){
                req.bonsai = bonsai;
                next();
            }
            else
            {
                res.status(404).send('No bonsai found')
            }
        });
    });
    bonsaiRouter.route('/:bonsaiId')
        .get(function (req,res) {

            req.bonsai._links = {self: {href: "http://" + req.headers.host + "/api/bonsais/" + req.bonsai._id},
                collection: {href: "http://" + req.headers.host + "/api/bonsais/"}
            };

            res.json(req.bonsai);
        })
        .options(function (req,res) {
            res.header('Allow', 'GET,OPTIONS,PUT,PATCH,DELETE');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,DELETE,OPTIONS');
            res.status(200).send();
        })
        .put(function (req,res) {
            req.bonsai.title = req.body.title;
            req.bonsai.species = req.body.species;
            req.bonsai.age = req.body.age;
            req.bonsai.price = req.body.price;
            req.bonsai.save(function (err) {
                if (err) {
                    res.status(400).send(err);
                }
                else {
                    res.json(req.bonsai);
                }
            });
        })
        .patch(function (req,res) {
            if(req.body._id) {
                delete req.body._id;
            }

            for(var p in req.body)
            {
                req.bonsai[p] = req.body[p];
            }

            req.bonsai.save(function (err) {
                if(err) {
                    res.status(500).send(err);
                }
                else{
                    res.json(req.bonsai);
                }
            });
        })
        .delete(function (req,res) {
            req.bonsai.remove(function (err) {
                if(err)
                    res.status(500).send(err);
                else{
                    res.status(204).send('Removed');
                }
            });
        });
    return bonsaiRouter;
};

module.exports = routes;