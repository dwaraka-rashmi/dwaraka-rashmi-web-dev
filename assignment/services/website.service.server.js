/**
 * Created by Rashmi_Dwaraka on 5/31/2016.
 */
module.exports = function(app,models){

     var websiteModel = models.websiteModel;

    app.post("/api/user/:userId/website",createWebsite);
    app.get("/api/user/:userId/website",findAllWebsitesForUser);
    app.get("/api/website/:websiteId",findWebsiteById);
    app.put("/api/website/:websiteId",updateWebsite);
    app.delete("/api/website/:websiteId",deleteWebsite);

    function createWebsite(req,res){
        var id = req.params.userId;
        var newWebsite = req.body;
        websiteModel
            .createWebsite(id,newWebsite)
            .then(
                function(website){
                    res.json(website);
                },
                function(error){
                    res.json({});
                }
            );
    }

    function findAllWebsitesForUser(req,res) {
        var id = req.params.userId;
        websiteModel
            .findAllWebsitesForUser(id)
            .then(
                function(websites){
                    res.json(websites);
                },
                function(error){
                    res.json({});
                }
            );
    }

    function findWebsiteById(req,res) {
        var id = req.params.websiteId;

        websiteModel
            .findWebsiteById(id)
            .then(
                function(website){
                    res.json(website);
                },
                function(error){
                    res.json({});
                }
            );
    }

    function updateWebsite(req,res) {
        var websiteId = req.params.websiteId;
        var website = req.body;
        websiteModel
            .updateWebsite(websiteId,website)
            .then(
                function(website){
                    res.json(website);
                },
                function(error){
                    res.json({});
                }
            );
    }

    function deleteWebsite(req,res) {
        var websiteId = req.params.websiteId;
        websiteModel
            .deleteWebsite(websiteId)
            .then(
                function(success){
                    res.json(200);
                },
                function(error){
                    res.json(400);
                }
            );
    }

};