const {google}  = require("googleapis")

const {client_email,private_key} = require("./vendorForm-secrets.json")

const dotenv = require("dotenv");
dotenv.config();

exports.sheet_id= process.env.SHEET_ID


// create google sheet client

const  client = new google.auth.JWT(client_email,null,private_key,["https://www.googleapis.com/auth/spreadsheets"])

exports.sheets = google.sheets({version:"v4",auth:client})
