
const express = require("express");
const app = express();

const sheetClientDetails = require("./sheetClient")
// const User = require("./models/user")

app.use(express.json());

const cors = require("cors");
app.use(cors());

// const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

app.listen(7980,()=>{
    console.log('server starts at given port Successfully');
})


app.post("/send",async(requestObject,responseObject)=>{
    try {
        const AllValues = Object.values(requestObject.body)
        console.log(AllValues)
        await sheetClientDetails.sheets.spreadsheets.values.append({
            spreadsheetId:sheetClientDetails.sheet_id,
            range:'VendorData!A:G',
            insertDataOption:'INSERT_ROWS',
            valueInputOption:'RAW',
            requestBody:{
                values:[AllValues]
            }
        })
        responseObject.status(201) // Respond with status 201 for successful creation
        ; 
    } catch (error) {
        console.log(error.message)
        responseObject.status(500)// server error
        responseObject.send(error.message)
    }
})
