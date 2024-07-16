

// const express = require('express')
// const app = express()
// const mysql = require('mysql')
// const cors = require('cors')

// app.use(express.json())
// app.use(cors(
// ))

// app.use((req, res, next) => {
//     res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
//     res.setHeader('Pragma', 'no-cache');
//     res.setHeader('Expires', '0');
//     next(); 
// });

//                                                         console.log('br point 00')


// //run the server
// app.listen(3001, () => {
//     console.log('server running on port 3001')
// })

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

//                                                         console.log('br point 01')


// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'sqluser',
//     password: 'password',
//     database: 'Database_01'
// })

//                                                         console.log('br point 02')


// db.connect((err) => {
//     if(err) {
//         console.log(err)
//     } else {
//         console.log('database connected')
//     }
// })



// //to register an user , create route to the server

// app.post('/registration', (req, res) => {

//     //get variables sent from the form

//     const sentEmail = req.body.Email
//     const sentPassword = req.body.Password
//     const sentconfirmpassword = req.body.Confirmpassword

//     //console.log(sentEmail, sentPassword, sentconfirmpassword)
//     console.log('br point 03')

//     //craete sql statement to insert to database table User
    
//         const sql =  'INSERT INTO User (Email, Password, Username) VALUES (?,?,?)'

//         //enter above values through a variable
//         const values = [sentEmail, sentPassword, sentconfirmpassword]

//         // query to execute the above sql statement
//         db.query(sql, values, (err, result) => {
//             if (err) {
//                 res.send(err)
//             } else {
//                 console.log('user inserted to the table successfully!')
//                 res.send({message:'User added!'})
//             }
//         })
    
// })

//                                                             console.log('br point 04')
// //route for user login
// app.post('/login', (req, res) => {

//     //get variables sent from the form
//     const sentloginemail = req.body.Email
//     const sentloginpassword = req.body.Password
    
//     const sql = 'SELECT * FROM User WHERE Email = ? AND Password = ?'

//     const values = [sentloginemail, sentloginpassword]

//     // query to execute the above sql statement
//     db.query(sql, values, (err, result) => {
//         if (err) {
//             res.send({error: err})
//         }if (result.length > 0) {
//             res.send(result)
//         }
        
//         else {
//             console.log('wrong credentials')
//             res.send({message:'wrong credentials'})
//         }
//     })
// })
