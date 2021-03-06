/**
 * Created by Rashmi_Dwaraka on 6/9/2016.
 */

module.exports = function() {
    var mongoose = require("mongoose");

    var UserSchemaProject = mongoose.Schema({
        username: {type: String, required: true},
        password: String,
        firstName: String,
        lastName: String,
        pic:String,
        google:{
            token:String,
            id:String
        },
        dob: Date,
        isAdmin : Boolean,
        followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserProject'}],
        following: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserProject'}],
        productsSaved:[],
        Reviews:[{type: mongoose.Schema.Types.ObjectId, ref: 'ReviewProject'}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.user"});

    return UserSchemaProject;
};