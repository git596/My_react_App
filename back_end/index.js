require('dotenv').config();                     //newly added 20th Monday for file/image functionality
const express = require('express')
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
const util = require('util');

const jwt = require('jsonwebtoken')             //Neww
const bodyParser = require('body-parser')       //Neww

const app = express()
const mysql = require('mysql')
const cors = require('cors')
const upload = require('./multer')              //newly added 20th Monday   for file/image functionality
const cloudinary = require('cloudinary').v2     //newly added 20th Monday   for file/image functionality

cloudinary.config({                             //newly added 20th Monday   for file/image functionality
    cloud_name: process.env.CLOUD_NAME,         //newly added 20th Monday   for file/image functionality
    api_key: process.env.API_KEY,               //newly added 20th Monday   for file/image functionality
    api_secret: process.env.API_SECRETS         //newly added 20th Monday   for file/image functionality
})                                              //newly added 20th Monday   for file/image functionality

app.use(express.json())
app.use(cors(
))
app.use(bodyParser.json())                      //Neww

//following is the key created for JWT token
const SECRET_KEY = process.env.SECRET_KEY;      //Neww

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next(); 
});

const db = mysql.createConnection({
    host: 'localhost',
    user: 'sqluser',
    password: 'password',
    database: 'Database_01'
})

                                                        console.log('break point 02')

                                                        
db.connect((err) => {
    if(err) {
        console.log(err)
    } else {
        console.log('database connected')
    }
})



// Define a route handler for the /users endpoint to DISPLAY USERS in the WEB SITE  
// This endpoint, "/users" will fetch all the users from the database
app.get("/users", (req, res) => {
    // SQL query to fetch user data
    const sql = "SELECT User_ID, FirstName AS first_name, LastName AS last_name, Email AS email, Address AS address, UserType AS user_type FROM User";

    // Execute the query
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching users:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        
        // Return the fetched user data as JSON response
        res.json(results);
    });
});
                                                            console.log('break point 00')


//define a router handler for the /items endpoint to DISPLAY ITEMS in the WEB SITE
//this endpoint, "/items" will fetch all the items from the database
app.get("/items", (req, res) => {
    const sql = "SELECT Item_ID, ItemType AS item_type, ItemName AS item_name, ItemPrice AS item_price, ItemQuantity AS item_quantity FROM Item";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching items:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        res.json(results);
    });
});

                                                            

//GET endpoint /user/:userId, where :userId is a URL parameter representing the user ID. 
//It fetches user details from the database based on the provided user ID and returns the details as JSON. 
//this end point is for View user (when USER CLICKS on VIEW this END POINT will be CALLED)  
app.get("/user/:userId", (req, res) => {
    const userId = req.params.userId;
    const sql = "SELECT User_ID, FirstName AS first_name, LastName AS last_name, Email AS email, Address AS address FROM User WHERE User_ID = ?";
    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error("Error fetching user:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (result.length === 0) {
            //If the user is not found, it returns a 404 error.
            return res.status(404).json({ error: "User not found" });
        }
        res.json(result[0]);
    });
});



//this end point is for View item (when USER CLICKS on VIEW this END POINT will be CALLED)  
app.get("/item/:itemId", (req, res) => {
    const itemId = req.params.itemId;
    const sql = "SELECT Item_ID, ItemName AS item_name, ItemType AS item_type, ItemPrice AS item_price, ItemBrand AS item_brand FROM Item WHERE Item_ID = ?";
    db.query(sql, [itemId], (err, result) => {
        if (err) {
            console.error("Error fetching item:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (result.length === 0) {
            //If the item is not found, it returns a 404 error.
            return res.status(404).json({ error: "Item not found" });
        }
        res.json(result[0]);
    });
});


//this is the put request for update user
app.put("/user/:userId", (req, res) => {
    const userId = req.params.userId;
    const updatedUser = req.body; // Assuming the updated user details are sent in the request body

    // Update the user details in the database
    const sql = "UPDATE User SET FirstName = ?, LastName = ?, Email = ?, Address = ? WHERE User_ID = ?";
    const values = [updatedUser.first_name, updatedUser.last_name, updatedUser.email, updatedUser.address, userId];
    
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error updating user:", err);
            return res.status(500).json({ error: "Internal server error" });
        }

        if (result.affectedRows === 0) {
            // If no rows were affected, it means the user with the given ID was not found
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ message: "User updated successfully" });
    });
});



//this is the put request for update an item
app.put("/item/:itemId", (req, res) => {
    const itemId = req.params.itemId;
    const updatedItem = req.body; // Assuming the updated item details are sent in the request body

    // Update the item details in the database
    const sql = "UPDATE Item SET ItemName = ?, ItemType = ?, ItemPrice = ?, ItemBrand = ? WHERE Item_ID = ?";
    const values = [updatedItem.item_name, updatedItem.item_type, updatedItem.item_price, updatedItem.item_brand, itemId];
    
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error updating item:", err);
            return res.status(500).json({ error: "Internal server error" });
        }

        if (result.affectedRows === 0) {
            // If no rows were affected, it means the item with the given ID was not found
            return res.status(404).json({ error: "Item not found" });
        }

        res.json({ message: "Item updated successfully" });
    });
});



//code to delete a user both request and the sql query
app.delete("/user/:userId", (req, res) => {
    const userId = req.params.userId;
    const sql = "DELETE FROM User WHERE User_ID = ?";
    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error("Error deleting user:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (result.affectedRows === 0) {
            // If no rows were affected, it means the user with the given ID was not found
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    });
});


//code to delete an item both request and the sql query
app.delete("/item/:itemId", (req, res) => {
    const itemId = req.params.itemId;
    const sql = "DELETE FROM Item WHERE Item_ID = ?";
    db.query(sql, [itemId], (err, result) => {
        if (err) {
            console.error("Error deleting item:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (result.affectedRows === 0) {
            // If no rows were affected, it means the item with the given ID was not found
            return res.status(404).json({ error: "Item not found" });
        }
        res.json({ message: "Item deleted successfully" });
    });
});

                                                            



//test get request
app.get('/', (req, res) => {
    res.send('Hello World!')
})

                                                        console.log('break point 01')


//to register an user , create route to the server
//post request for registration
app.post('/registration', (req, res) => {

    //get variables sent from the form

    const sentEmail = req.body.Email
    const sentPassword = req.body.Password
    const sentconfirmpassword = req.body.Confirmpassword
    const sentUserType = req.body.UserType
    const sentPhone = req.body.Phone
    const sentAddress = req.body.Address
    const sentFirstName = req.body.FirstName
    const sentLastName = req.body.LastName
    const sentGender = req.body.Gender
    const sentSlocation = req.body.Slocation
    const sentBusinessName = req.body.BusinessName
    
    
    

    //console.log(sentEmail, sentPassword, sentconfirmpassword)
    console.log('br point 03')

    //craete sql statement to insert to database table User
    
        const sql =  'INSERT INTO User (Email, Password, Username, UserType, Phone, Address, FirstName, LastName) VALUES (?,?,?,?,?,?,?,?)'

        //enter above values through a variable
        const values = [sentEmail, sentPassword, sentconfirmpassword, sentUserType, sentPhone, sentAddress, sentFirstName, sentLastName]

        // query to execute the above sql statement
        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error inserting user:', err);
                res.send(err)
            } else {
                console.log('user inserted to the table successfully!')
                // res.send({message:'User added!'})

                const userId = result.insertId;

                let sqlInsertRole, roleValues;

                switch(sentUserType.toLowerCase()) {
                    case 'customer':
                        sqlInsertRole = 'INSERT INTO Customer (User_ID, Gender) VALUES (?,?)';
                        roleValues = [userId, sentGender];
                        break;
                    
                    case 'supplier':
                        sqlInsertRole = 'INSERT INTO Supplier (User_ID, SLocation, BusinessName) VALUES (?,?,?)';
                        roleValues = [userId, sentSlocation, sentBusinessName];
                        break;

                    default:
                        return res.status(400).send({ message: 'Invalid User Type' });   
                }

                db.query(sqlInsertRole, roleValues, (err, result) => {
                    if (err) {
                        console.error('Error inserting user:', err);
                        res.send(err)
                    } else {
                        console.log(`${sentUserType} inserted to the table successfully!`)
                        res.send({message:`${sentUserType} User added!`})
                    }
                })

            }
        })
    
})

                                                            console.log('break point 04')
//route for user login
//post request for login
app.post('/login', (req, res) => {

    //get variables sent from the form
    const sentloginemail = req.body.Email
    const sentloginpassword = req.body.Password
    
    const sql = 'SELECT * FROM User WHERE Email = ? AND Password = ?'

    const values = [sentloginemail, sentloginpassword]

    // query to execute the above sql statement
    db.query(sql, values, (err, result) => {
        if (err) {
            res.send({error: err})
        }if (result.length > 0) {
            const user = result[0];
            const token = jwt.sign({
                userId: user.User_ID, // to store  User_ID in the token when user log in to the system 
                userType: user.UserType,  // to store  UserType in the token when user log in to the system
                email: user.Email},   // to store  Email in the token when user log in to the system
                SECRET_KEY,
            {expiresIn: '1h'});
            res.send({message:'Login Successful' , token, user:{...user, FirsetName: user.FirstName} });
        }
        
        else {
            console.log('wrong credentials')
            res.send({message:'wrong credentials'})
        }
    })
})

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    //console.log('Authorization header:', authHeader); // Log the full authorization header

    if (!authHeader) {
        console.log('No authorization header provided.');
        return res.status(403).send({ message: 'No token provided.' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token after 'Bearer'
    //console.log('Token extracted:', token); // Log the extracted token

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            console.error('Failed to authenticate token:', err); // Log the error
            return res.status(500).send({ message: 'Failed to authenticate token.' });
        }

        console.log('Token decoded:', decoded); // Log the decoded token
        req.userId = decoded.userId;
        req.userType = decoded.userType;
        next();
    });
};

// Middleware to verify token , this did't work for UploadDocument function, So above verifyToken was coded
/* const verifyToken = (req, res, next) => {                                   //newww
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send({ message: 'No token provided.' });
  
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) return res.status(500).send({ message: 'Failed to authenticate token.' });
  
      req.userId = decoded.userId;
      req.userType = decoded.userType;
      next();
    });
  }; */

// Protect a route with middleware
app.get('/protected', verifyToken, (req, res) => {                          //newww
    res.send({ message: 'This is a protected route!' });
  });




//post request to add(create) a user
app.post("/add_user", (req, res) => {
  const sql =
    "INSERT INTO User (`Firstname`,`Lastname`,`Email`,`Password`,`Address`,`UserType`) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [req.body.first_name, req.body.last_name, req.body.email, req.body.password, req.body.address, req.body.userType];

  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occurred: " + err });

    const userId = result.insertId;

    switch (req.body.userType) {
      case 'customer':
        const customerSql = "INSERT INTO Customer (`User_ID`, `Gender`) VALUES (?, ?)";
        const customerValues = [userId, req.body.gender];
        db.query(customerSql, customerValues, (err, result) => {
          if (err)
            return res.json({ message: "Something unexpected has occurred: " + err });
          return res.json({ success: "Customer added successfully" });
        });
        break;
      case 'supplier':
        const supplierSql = "INSERT INTO Supplier (`User_ID`, `SLocation`, `BusinessName`) VALUES (?, ?, ?)";
        const supplierValues = [userId, req.body.sLocation, req.body.businessName];
        db.query(supplierSql, supplierValues, (err, result) => {
          if (err)
            return res.json({ message: "Something unexpected has occurred: " + err });
          return res.json({ success: "Supplier added successfully" });
        });
        break;
      case 'owner':
        const ownerSql = "INSERT INTO Owner (`User_ID`, `OwnerDescription`) VALUES (?, ?)";
        const ownerValues = [userId, req.body.ownerDescription];
        db.query(ownerSql, ownerValues, (err, result) => {
          if (err)
            return res.json({ message: "Something unexpected has occurred: " + err });
          return res.json({ success: "Owner added successfully" });
        });
        break;
      default:
        return res.json({ message: "Invalid user type" });
    }
  });
});




//post request to add(create) an item
app.post("/add_item", upload.single('image'), (req, res) => {
    const { item_name, item_type, item_price, purchase_price, item_brand, item_quantity, supplier_id } = req.body;
    const imageFile = req.file;
  
    cloudinary.uploader.upload_stream({folder: "images"}, (error, result) => {
      if (error) return res.status(500).json({ message: "Image upload failed" });
  
      const { public_id, url } = result;
  
      const sql = "INSERT INTO Item (Supplier_ID ,ItemName, ItemType, ItemPrice, PurchasePrice, ItemBrand, ImageName, ImageType, Image_URL, Public_ID, ItemQuantity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      const values = [
        supplier_id, item_name, item_type, item_price, purchase_price, item_brand,  
        imageFile.originalname, imageFile.mimetype, url, public_id, item_quantity
      ];
  
      db.query(sql, values, (err) => {
        if (err) return res.status(500).json({ message: "Database insertion failed" });
        res.json({ success: "Item added successfully" });
      });
    }).end(imageFile.buffer);
  });


//endpoint to retrive supplier names to include in the dropdown in the front end
app.get("/suppliers", (req, res) => {
    const sql = `
        SELECT s.Supplier_ID, u.FirstName 
        FROM Supplier s
        JOIN User u ON s.User_ID = u.User_ID
    `;

    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ message: "Database query failed" });
        res.json(results);
    });
});

//endpoint to update the quantity of an item (adding new stocks)
app.post("/update_quantity", (req, res) => {
  const { item_id, supplier_id, item_quantity } = req.body;

  const sql = "UPDATE Item SET ItemQuantity = ItemQuantity + ? WHERE Item_ID = ? AND Supplier_ID = ?";
  const values = [item_quantity, item_id, supplier_id];

  db.query(sql, values, (err) => {
      if (err) return res.status(500).json({ message: "Database update failed" });
      res.json({ success: "Item quantity updated successfully" });
  });
});

//endpoint to retrive item names to include in the dropdown in the front end
app.get("/fetchitems", (req, res) => {
  const { supplier_id } = req.query;
  const sql = "SELECT Item_ID, ItemName FROM Item WHERE Supplier_ID = ?";

  db.query(sql, [supplier_id], (err, results) => {
      if (err) return res.status(500).json({ message: "Database query failed" });
      res.json(results);
  });
});
/* Above endpoint can be removed since we already have an endpoint to fetch all items
which is app.get("/items", (req, res).  but if u use that endpoint u have to change the 
ItemName to item_name inside the return statement of the frontend(UpdateItemQuantity), because 
in that endpoint ItemName is taken AS item_name in the query */







//function and the request for uploading document with the typesetting details
  function uploadDocument(req, res, next) {
    upload.single('document')(req, res, (err) => {
      if (err) {
        console.error('Error uploading file:', err);
        return res.status(500).send({ message: 'Error uploading file.' });
    }

      const userId = req.userId;                // retrieve User_ID from the token

      // sql statement to Fetch Customer_ID from the Customer table using User_ID
      const getCustomerIdSql = "SELECT Customer_ID FROM Customer WHERE User_ID = ?";

      // Execute the query to fetch Customer_ID from the Customer table using User_ID
      db.query(getCustomerIdSql, [userId], (err, result) => {
          if (err) {
            console.error('Error fetching customer ID:', err);
            return res.status(500).send({ message: 'Error fetching customer ID.' });
        }

          if (result.length === 0) {
              return res.status(404).json({ message: "Customer not found" });
          }

          const customerId = result[0].Customer_ID; // retrieve Customer_ID from the result
        
      const { objectType, formattingStyle, fontType, fontSize, layout, margins, lineSpacing, quantity, additionalElements, specialInstructions, startPage, endPage } = req.body; // Add other fields as necessary
      const documentFile = req.file;
      const { originalname, buffer } = documentFile;

      const fileextension = originalname.split('.').pop(); // Extract the file extension from the original file
      const public_ID = `${originalname.split('.')[0]}.${fileextension}`; // Create a unique public ID
   // const public_ID = `${originalname.split('.')[0]}_${Date.now()}.${fileextension}`; // Create a unique public ID

          const serviceId = '3';
          console.log('Service ID:', serviceId);

  
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'raw', // Ensure that the file is uploaded as a raw file
          folder: 'documents',
          public_id: public_ID
        },
        (error, result) => {
          if (error) {
            console.error('Error uploading to Cloudinary:', error);
            return res.status(500).send({ message: 'Error uploading to Cloudinary.' });
        }
  
          const { secure_url } = result;
  
          const data = {
            Customer_ID: customerId,            //todayyyy Insert Retrieved Customer_ID(retrieved from User table) to the Document table
            Service_ID: serviceId,
            Document_Name: originalname,
            Document_Type: documentFile.mimetype,
            Document_URL: secure_url,
            Public_ID: public_ID
          };

          
          
          const sql = "INSERT INTO Document SET ?";
          const typesetting_sql = "INSERT INTO TypeSettingDetails SET ?";
  
          db.query(sql, data, (err, result) => {
            if (err) {
                console.error('Error inserting document:', err);
                return res.status(500).send({ message: 'Error inserting document.' });
            }

            const documentId = result.insertId; // Retrieve the inserted document ID from result

            const typesetting_data = {
                Document_ID: documentId,    // Use the retrieved document ID as the foreign key
                Object_Type: objectType,
                Formatting_Style: formattingStyle,
                Font_Type: fontType,
                Font_Size: fontSize,
                Layout: layout,
                Page_Margin: margins,
                Line_Spacing: lineSpacing,
                Quantity: quantity,
                Additional_Element: additionalElements,
                Special_Instructions: specialInstructions,
                Start_Page: startPage,
                End_Page: endPage
              };
            
                    db.query(typesetting_sql, typesetting_data, (err, result) => {
                    if (err) {
                        console.error('Error inserting typesetting details:', err);
                        return res.status(500).send({ message: 'Error inserting typesetting details.' });
                    }
                    res.json({ 
                        success: "Document uploaded successfully", 
                        document: data,
                        typesetting: typesetting_data

                        });
                    });
          });
        }
      ).end(buffer);
    });
    });
  }

app.post("/upload_document", verifyToken , uploadDocument);   // Use verifyToken middleware also


//function and the request for the uploading document with Laminating details
function uploadLaminatingDocument(req, res, next) {
  upload.single('document')(req, res, (err) => {
      if (err) {
          console.error('Error uploading file:', err);
          return res.status(500).send({ message: 'Error uploading file.' });
      }

      const userId = req.userId;
      const getCustomerIdSql = "SELECT Customer_ID FROM Customer WHERE User_ID = ?";
      db.query(getCustomerIdSql, [userId], (err, result) => {
          if (err) {
              console.error('Error fetching customer ID:', err);
              return res.status(500).send({ message: 'Error fetching customer ID.' });
          }
          if (result.length === 0) {
              return res.status(404).json({ message: "Customer not found" });
          }
          const customerId = result[0].Customer_ID;

          const { documentSize, laminationType, thickness, quantity, specialInstructions, startPage, endPage } = req.body;
          const documentFile = req.file;
          const { originalname, buffer } = documentFile;
          const fileextension = originalname.split('.').pop();
          const public_ID = `${originalname.split('.')[0]}.${fileextension}`;

          const serviceId = '2'; // Replace with the appropriate service ID
          console.log('Service ID:', serviceId);

          cloudinary.uploader.upload_stream(
              {
                  resource_type: 'raw',
                  folder: 'documents',
                  public_id: public_ID
              },
              (error, result) => {
                  if (error) {
                      console.error('Error uploading to Cloudinary:', error);
                      return res.status(500).send({ message: 'Error uploading to Cloudinary.' });
                  }

                  const { secure_url } = result;

                  const data = {
                      Customer_ID: customerId,
                      Service_ID: serviceId,
                      Document_Name: originalname,
                      Document_Type: documentFile.mimetype,
                      Document_URL: secure_url,
                      Public_ID: public_ID
                  };

                  const sql = "INSERT INTO Document SET ?";
                  const laminating_sql = "INSERT INTO LaminateDetails SET ?";

                  db.query(sql, data, (err, result) => {
                      if (err) {
                          console.error('Error inserting document:', err);
                          return res.status(500).send({ message: 'Error inserting document.' });
                      }
                      const documentId = result.insertId;
                      const laminating_data = {
                          Document_ID: documentId,
                          Document_Size: documentSize,
                          Laminating_Type: laminationType,
                          Thickness: thickness,
                          Quantity: quantity,
                          Special_Instructions: specialInstructions,
                          Start_Page: startPage,
                          End_Page: endPage
                      };

                      db.query(laminating_sql, laminating_data, (err, result) => {
                          if (err) {
                              console.error('Error inserting laminating details:', err);
                              return res.status(500).send({ message: 'Error inserting laminating details.' });
                          }
                          res.json({ 
                              success: "Document uploaded successfully", 
                              document: data,
                              laminatingdata: laminating_data
                          });
                      });
                  });
              }
          ).end(buffer);
      });
  });
}

app.post("/upload_laminating_document", verifyToken, uploadLaminatingDocument);




//function and the request for the uploading document with Printing Details
function uploadPrintingDocument(req, res, next) {
  upload.single('document')(req, res, (err) => {
      if (err) {
          console.error('Error uploading file:', err);
          return res.status(500).send({ message: 'Error uploading file.' });
      }
      const userId = req.userId;  // Retrieve User_ID from the token

      const getCustomerIdSql = "SELECT Customer_ID FROM Customer WHERE User_ID = ?";
      db.query(getCustomerIdSql, [userId], (err, result) => {
          if (err) {
              console.error('Error fetching customer ID:', err);
              return res.status(500).send({ message: 'Error fetching customer ID.' });
          }
          if (result.length === 0) {
              return res.status(404).json({ message: "Customer not found" });
          }
          const customerId = result[0].Customer_ID;

          const { additionalInstructions, printParts } = req.body;
          console.log('Received print parts:', printParts); // Log the received print parts data

          const documentFile = req.file;
          const { originalname, buffer } = documentFile;
          const fileextension = originalname.split('.').pop();
          const public_ID = `${originalname.split('.')[0]}.${fileextension}`;

          const serviceId = '1'; // Replace with the appropriate service ID
          console.log('Service ID:', serviceId);

          cloudinary.uploader.upload_stream(
              {
                  resource_type: 'raw',
                  folder: 'documents',
                  public_id: public_ID
              },
              (error, result) => {
                  if (error) {
                      console.error('Error uploading to Cloudinary:', error);
                      return res.status(500).send({ message: 'Error uploading to Cloudinary.' });
                  }

                  const { secure_url } = result;

                  const data = {
                      Customer_ID: customerId,
                      Service_ID: serviceId,
                      Document_Name: originalname,
                      Document_Type: documentFile.mimetype,
                      Document_URL: secure_url,
                      Public_ID: public_ID
                  };

                  const sql = "INSERT INTO Document SET ?";
                  db.query(sql, data, (err, result) => {
                      if (err) {
                          console.error('Error inserting document:', err);
                          return res.status(500).send({ message: 'Error inserting document.' });
                      }
                      const documentId = result.insertId;

                      const printingSql = "INSERT INTO PrintDetails SET ?";
                      const printingData = {
                          Document_ID: documentId,
                          Additional_Instructions: additionalInstructions
                      };

                      db.query(printingSql, printingData, (err, result) => {
                          if (err) {
                              console.error('Error inserting printing details:', err);
                              return res.status(500).send({ message: 'Error inserting printing details.' });
                          }
                          const printingId = result.insertId;

                          const printPartsData = JSON.parse(printParts).map(part => ({
                              Printing_ID: printingId,
                              Start_Page: part.startPage,
                              End_Page: part.endPage,
                              Page_Type: part.printType,
                              Color: part.colorOption,
                              Quantity: part.numCopies,
                              Page_Size: part.pageSize,
                              Binding_Option: part.bindingOptions
                          }));

                          console.log('Parsed print parts data:', printPartsData); // Log the parsed print parts data
                          const printPartsSql = "INSERT INTO Printing_Part_Details (Printing_ID, Start_Page, End_Page, Page_Type, Color, Quantity, Page_Size, Binding_Option) VALUES ?";
                          const printPartsValues = printPartsData.map(part => [
                              part.Printing_ID,
                              part.Start_Page,
                              part.End_Page,
                              part.Page_Type,
                              part.Color,
                              part.Quantity,
                              part.Page_Size,
                              part.Binding_Option
                          ]);

                          console.log('Print parts values to be inserted:', printPartsValues); // Log the values to be inserted

                          db.query(printPartsSql, [printPartsValues], (err, result) => {
                              if (err) {
                                  console.error('Error inserting printing part details:', err);
                                  return res.status(500).send({ message: 'Error inserting printing part details.' });
                              }
                              res.json({
                                  success: "Document uploaded successfully",
                                  document: data,
                                  printingData: printingData,
                                  printPartsData: printPartsData
                              });
                          });
                      });
                  });
              }
          ).end(buffer);
      });
  });
}

app.post("/upload_printing_document", verifyToken, uploadPrintingDocument);





//get request to display all images
// app.get("/images", (req, res) => {                  //newly added 20th Monday   for file/image functionality
//     const sql = "SELECT * FROM Item";
//     db.query(sql, (err, result) => {
//         if (err) throw err;
//         res.json(result);
//     });
// });  

//above code is the old code, follwing code is the modified code adding search functionality also. 29th May





/* app.get("/images", (req, res) => {
  const searchTerm = req.query.search || '';
  const sql = `SELECT * FROM Item WHERE ItemName LIKE ? OR ItemBrand LIKE ?`;
  const values = [`%${searchTerm}%`, `%${searchTerm}%`];

  db.query(sql, values, (err, result) => {
      if (err) throw err;
      res.json(result);
  });
}); */


app.get("/images", (req, res) => {
  const searchTerm = req.query.search || '';
  const brands = req.query.brands ? req.query.brands.split(',') : [];
  const types = req.query.types ? req.query.types.split(',') : [];
  const minPrice = req.query.minPrice || 0;
  const maxPrice = req.query.maxPrice || Number.MAX_SAFE_INTEGER;

  // Start building the SQL query
  let sql = "SELECT * FROM Item WHERE (ItemName LIKE ? OR ItemBrand LIKE ?)";
  const values = [`%${searchTerm}%`, `%${searchTerm}%`];

  // Add brand filters if any
  if (brands.length > 0) {
      const brandPlaceholders = brands.map(() => '?').join(',');
      sql += ` AND ItemBrand IN (${brandPlaceholders})`;
      values.push(...brands);
  }

  // Add type filters if any
  if (types.length > 0) {
      const typePlaceholders = types.map(() => '?').join(',');
      sql += ` AND ItemType IN (${typePlaceholders})`;
      values.push(...types);
  }

  // Add price range filters
  sql += " AND ItemPrice BETWEEN ? AND ?";
  values.push(minPrice, maxPrice);

  db.query(sql, values, (err, result) => {
      if (err) throw err;
      res.json(result);
  });
});


app.get('/items/:id', (req, res) => {
  const itemId = req.params.id;
  const sql = "SELECT * FROM Item WHERE Item_ID = ?";
  db.query(sql, [itemId], (err, result) => {
      if (err) {
          res.status(500).send({ error: 'Error fetching item' });
      } else {
          res.json(result[0]);  // Send the first result (item) as a JSON response
      }
  });
});


app.post('/cart', verifyToken, (req, res) => {
  const itemId = req.body.itemId;
  const quantity = req.body.quantity;
  const userId = req.userId;

  // Retrieve Customer_ID using User_ID
  const getCustomerIdSql = "SELECT Customer_ID FROM Customer WHERE User_ID = ?";
  db.query(getCustomerIdSql, [userId], (err, result) => {
      if (err || result.length === 0) {
          res.status(500).send({ error: 'Error fetching customer ID' });
      } else {
          const customerId = result[0].Customer_ID;
          // Use customerId to add item to cart
          const checkCartSql = "SELECT * FROM Cart WHERE Item_ID = ? AND Customer_ID = ?";
          db.query(checkCartSql, [itemId, customerId], (err, result) => {
              if (err) {
                  res.status(500).send({ error: 'Error checking cart' });
              } else if (result.length > 0) {
                  const updateCartSql = "UPDATE Cart SET CartQuantity = CartQuantity + ? WHERE Cart_ID = ?";
                  db.query(updateCartSql, [quantity, result[0].Cart_ID], (err, result) => {
                      if (err) {
                          res.status(500).send({ error: 'Error updating cart' });
                      } else {
                          res.send({ message: 'Cart updated successfully' });
                      }
                  });
              } else {
                  const addToCartSql = "INSERT INTO Cart (Item_ID, Customer_ID, CartQuantity) VALUES (?, ?, ?)";
                  db.query(addToCartSql, [itemId, customerId, quantity], (err, result) => {
                      if (err) {
                          res.status(500).send({ error: 'Error adding to cart' });
                      } else {
                          res.send({ message: 'Item added to cart successfully' });
                      }
                  });
              }
          });
      }
  });
});



app.put('/cart', (req, res) => {
  const { cartId, quantity } = req.body;

  const updateCartSql = "UPDATE Cart SET CartQuantity = ? WHERE Cart_ID = ?";
  db.query(updateCartSql, [quantity, cartId], (err, result) => {
      if (err) {
          res.status(500).send({ error: 'Error updating cart quantity' });
      } else {
          res.send({ message: 'Cart quantity updated successfully' });
      }
  });
});


app.delete('/cart/:cartId', (req, res) => {
  const cartId = req.params.cartId;

  const removeCartSql = "DELETE FROM Cart WHERE Cart_ID = ?";
  db.query(removeCartSql, [cartId], (err, result) => {
      if (err) {
          res.status(500).send({ error: 'Error removing item from cart' });
      } else {
          res.send({ message: 'Item removed from cart successfully' });
      }
  });
});


app.get('/cart/count', verifyToken, (req, res) => {
  const userId = req.userId;

  const getCustomerIdSql = "SELECT Customer_ID FROM Customer WHERE User_ID = ?";
  db.query(getCustomerIdSql, [userId], (err, result) => {
      if (err || result.length === 0) {
          res.status(500).send({ error: 'Error fetching customer ID' });
      } else {
          const customerId = result[0].Customer_ID;
          const countCartSql = "SELECT SUM(CartQuantity) as count FROM Cart WHERE Customer_ID = ?";
          db.query(countCartSql, [customerId], (err, result) => {
              if (err) {
                  res.status(500).send({ error: 'Error fetching cart count' });
              } else {
                  res.send({ count: result[0].count || 0 });
              }
          });
      }
  });
});



app.get('/cart', verifyToken, (req, res) => {
  const userId = req.userId;

  const getCustomerIdSql = "SELECT Customer_ID FROM Customer WHERE User_ID = ?";
  db.query(getCustomerIdSql, [userId], (err, result) => {
      if (err || result.length === 0) {
          res.status(500).send({ error: 'Error fetching customer ID' });
      } else {
          const customerId = result[0].Customer_ID;
          const getCartItemsSql = `
              SELECT Cart.Cart_ID, Cart.CartQuantity, Item.ItemName, Item.ItemPrice, Item.ItemBrand, Item.ItemQuantity, Item.Image_URL
              FROM Cart
              JOIN Item ON Cart.Item_ID = Item.Item_ID
              WHERE Cart.Customer_ID = ?`;

          db.query(getCartItemsSql, [customerId], (err, result) => {
              if (err) {
                  res.status(500).send({ error: 'Error fetching cart items' });
              } else {
                  res.json(result);
              }
          });
      }
  });
});



// Promisify the db.query function
const query = util.promisify(db.query).bind(db);


app.post('/create-checkout-session', verifyToken, async (req, res) => {
    const userId = req.userId;
  
    try {
      const getCustomerIdSql = "SELECT Customer_ID FROM Customer WHERE User_ID = ?";
      const customerResult = await query(getCustomerIdSql, [userId]);
  
      if (customerResult.length === 0) {
        return res.status(400).send({ error: 'Customer not found' });
      }
  
      const customerId = customerResult[0].Customer_ID;
      const getCartItemsSql = `
        SELECT Cart.Cart_ID, Cart.CartQuantity, Item.ItemName, Item.ItemPrice, Item.ItemBrand, Item.ItemQuantity, Item.Image_URL
        FROM Cart
        JOIN Item ON Cart.Item_ID = Item.Item_ID
        WHERE Cart.Customer_ID = ?`;
  
      const cartItems = await query(getCartItemsSql, [customerId]);
  
      const lineItems = cartItems.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.ItemName,
          },
          unit_amount: item.ItemPrice * 100, // Price in cents
        },
        quantity: item.CartQuantity,
      }));
  
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        /* success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel', */
        success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}&customer_id=${customerId}`,
        cancel_url: `http://localhost:3000/cancel?session_id={CHECKOUT_SESSION_ID}&customer_id=${customerId}`,
      });
  
      res.json({ id: session.id });
    } catch (error) {
      console.error('Error creating checkout session:', error);
      res.status(500).send({ error: 'Error creating checkout session' });
    }
  });





app.get('/transaction-complete', async (req, res) => {
    const { session_id, customer_id, success } = req.query;

    try {
        // Fetch session details from Stripe
        const session = await stripe.checkout.sessions.retrieve(session_id);

        if (!session) {
            return res.status(400).send({ error: 'Session not found' });
        }

        const transactionAmount = session.amount_total / 100; // Convert from cents to dollars
        const isSuccessful = success === 'true';

        const insertTransactionSql = `
            INSERT INTO Transaction (Transaction_Date, Transaction_Amount, IsSuccessful, Customer_ID, Session_ID)
            VALUES (NOW(), ?, ?, ?, ?)`;
        
        await query(insertTransactionSql, [transactionAmount, isSuccessful, customer_id, session_id]);

        /* res.redirect(isSuccessful ? `/success?session_id=${session_id}&customer_id=${customer_id}` 
            : 
            `/cancel?session_id=${session_id}&customer_id=${customer_id}`); */
    } catch (error) {
        console.error('Error completing transaction:', error);
        res.status(500).send({ error: 'Error completing transaction' });
    }
});







//Endpoint to Clear Cart Items after payment is successful
  app.delete('/clear-cart', verifyToken, (req, res) => {
    const userId = req.userId;

    const getCustomerIdSql = "SELECT Customer_ID FROM Customer WHERE User_ID = ?";
    db.query(getCustomerIdSql, [userId], (err, result) => {
        if (err || result.length === 0) {
            return res.status(500).send({ error: 'Error fetching customer ID' });
        }

        const customerId = result[0].Customer_ID;
        const clearCartSql = "DELETE FROM Cart WHERE Customer_ID = ?";

        db.query(clearCartSql, [customerId], (err, result) => {
            if (err) {
                return res.status(500).send({ error: 'Error clearing cart' });
            }
            res.send({ message: 'Cart cleared successfully' });
        });
    });
});




app.post('/update-item-quantities', verifyToken, async (req, res) => {
    const userId = req.userId;

    try {
        const getCustomerIdSql = "SELECT Customer_ID FROM Customer WHERE User_ID = ?";
        const customerResult = await query(getCustomerIdSql, [userId]);

        if (customerResult.length === 0) {
            return res.status(400).send({ error: 'Customer not found' });
        }

        const customerId = customerResult[0].Customer_ID;
        const getCartItemsSql = `
            SELECT Cart.Item_ID, Cart.CartQuantity
            FROM Cart
            WHERE Cart.Customer_ID = ?`;

        const cartItems = await query(getCartItemsSql, [customerId]);

        const updatePromises = cartItems.map(item => {
            const updateSql = `
                UPDATE Item
                SET ItemQuantity = ItemQuantity - ?
                WHERE Item_ID = ?`;
            return query(updateSql, [item.CartQuantity, item.Item_ID]);
        });

        await Promise.all(updatePromises);

        res.send({ message: 'Item quantities updated successfully' });
    } catch (error) {
        console.error('Error updating item quantities:', error);
        res.status(500).send({ error: 'Error updating item quantities' });
    }
});











//end point to fetch document details and display them in the web page, owner or assistant can download documents from URL s
app.get("/documents", (req, res) => {
    // const sql = "SELECT Document_ID, Document_Name, Document_URL FROM Document";
    const sql = `
    SELECT 
      Document.Document_ID, 
      Document.Document_Name, 
      Document.Document_URL, 
      User.FirstName, 
      User.LastName,
      Document.Is_Collected
    FROM Document
    JOIN Customer ON Document.Customer_ID = Customer.Customer_ID
    JOIN User ON Customer.User_ID = User.User_ID
  `;
    db.query(sql, (err, result) => {
      if (err) return res.status(500).json({ message: "Error fetching documents" + err });
      res.json(result);
    });
  });

// Endpoint to update the state of Customer Collected the document or Not
app.put("/toggle-collected/:id", (req, res) => {
  const documentId = req.params.id;
  const currentStatus = req.body.currentStatus;
  const newStatus = currentStatus === 'collected' ? 'not collected' : 'collected';

  const sql = `UPDATE Document SET Is_Collected = ? WHERE Document_ID = ?`;
  db.query(sql, [newStatus, documentId], (err, result) => {
    if (err) return res.status(500).json({ message: "Error updating Is_Collected: " + err });
    res.json({ message: "Is_Collected updated successfully", newStatus });
  });
});

//End point to select entries in the table and delete them from the table
app.delete("/documents", (req, res) => {
  const documentIds = req.body.documentIds;
  const sql = `DELETE FROM Document WHERE Document_ID IN (?)`;
  db.query(sql, [documentIds], (err, result) => {
    if (err) return res.status(500).json({ message: "Error deleting documents: " + err });
    res.json({ message: "Documents deleted successfully" });
  });
});



/* 
    WHEN Service.Service_Type = 'Printing' THEN (
                SELECT JSON_OBJECT(
                'color', (SELECT Cost FROM ServiceOptionCosts WHERE OptionType = 'Color' AND OptionValue = PrintDetails.Color),
                'pageSize', (SELECT Cost FROM ServiceOptionCosts WHERE OptionType = 'Page_Size' AND OptionValue = PrintDetails.Page_Size),
                'bindingOption', (SELECT Cost FROM ServiceOptionCosts WHERE OptionType = 'Binding_Option' AND OptionValue = PrintDetails.Binding_Option)
                ) FROM PrintDetails WHERE PrintDetails.Document_ID = Document.Document_ID
            ) 
*/


// Endpoint to fetch document details for receipt generation
app.get("/document-details/:id", (req, res) => {
    const documentId = req.params.id;
    const sql = `
      SELECT 
        Document.Document_ID, 
        Document.Document_Name, 
        Service.Service_Type,
        Document.Customer_ID,
        Document.Service_ID,
        -- Join with the relevant service options table and costs table
        CASE 
          WHEN Service.Service_Type = 'Printing' THEN (
            SELECT JSON_ARRAYAGG(
              JSON_OBJECT(
                'partId', Printing_Part_Details.Part_ID,
                'color', (SELECT Cost FROM ServiceOptionCosts WHERE OptionType = 'Color' AND OptionValue = Printing_Part_Details.Color),
                'pageSize', (SELECT Cost FROM ServiceOptionCosts WHERE OptionType = 'Page_Size' AND OptionValue = Printing_Part_Details.Page_Size),
                'bindingOption', (SELECT Cost FROM ServiceOptionCosts WHERE OptionType = 'Binding_Option' AND OptionValue = Printing_Part_Details.Binding_Option),
                'quantity', Printing_Part_Details.Quantity
              )
            ) 
            FROM Printing_Part_Details 
            JOIN PrintDetails ON Printing_Part_Details.Printing_ID = PrintDetails.Printing_ID
            WHERE PrintDetails.Document_ID = Document.Document_ID
          )
          WHEN Service.Service_Type = 'Laminating' THEN (
            SELECT JSON_OBJECT(
              'documentSize', (SELECT Cost FROM ServiceOptionCosts WHERE OptionType = 'Document_Size' AND OptionValue = LaminateDetails.Document_Size),
              'laminatingType', (SELECT Cost FROM ServiceOptionCosts WHERE OptionType = 'Laminating_Type' AND OptionValue = LaminateDetails.Laminating_Type),
              'thickness', (SELECT Cost FROM ServiceOptionCosts WHERE OptionType = 'Thickness' AND OptionValue = LaminateDetails.Thickness),
              'quantity', LaminateDetails.Quantity
            ) FROM LaminateDetails WHERE LaminateDetails.Document_ID = Document.Document_ID
          )
          WHEN Service.Service_Type = 'TypeSetting' THEN (
            SELECT JSON_OBJECT(
              'costPerPage', (SELECT Cost FROM ServiceOptionCosts WHERE OptionType = 'Cost_Per_Page' AND Service_ID = Service.Service_ID),
              'quantity', TypeSettingDetails.Quantity
            ) FROM TypeSettingDetails WHERE TypeSettingDetails.Document_ID = Document.Document_ID
          )
        END AS options
      FROM Document
      JOIN Service ON Document.Service_ID = Service.Service_ID
      WHERE Document.Document_ID = ?
    `;
    db.query(sql, [documentId], (err, result) => {
      if (err) return res.status(500).json({ message: "Error fetching document details: " + err });
      res.json(result[0]);
    });
  });
  

//endpoint to insert data into the Receipt table.
  app.post("/create-receipt", (req, res) => {
    const { Customer_ID, Service_ID, TotalCost } = req.body;
    const sql = `
      INSERT INTO Receipt (Customer_ID, Service_ID, TotalCost, DateCreated)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
    `;
    db.query(sql, [Customer_ID, Service_ID, TotalCost], (err, result) => {
      if (err) return res.status(500).json({ message: "Error creating receipt: " + err });
      res.json({ message: "Receipt created successfully", receiptId: result.insertId });
    });
  });



  

// Endpoint to fetch document details, for customer to see their work progress
app.get('/api/documents', (req, res) => {
  const query = `
      SELECT 
          d.Document_ID,
          d.Document_Name, 
          u.FirstName, 
          u.LastName, 
          s.Service_Type,
          d.State 
      FROM 
          Document d
      JOIN 
          Customer c ON d.Customer_ID = c.Customer_ID
      JOIN 
          User u ON c.User_ID = u.User_ID
      JOIN 
          Service s ON d.Service_ID = s.Service_ID
  `;
  
  db.query(query, (error, results) => {
      if (error) {
          console.error('Error fetching data:', error);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
      }
      res.json(results);
  });
});



// Endpoint to update document state, That only owner can update the state of the work
app.put('/api/documents/:documentId/state', (req, res) => {
  const { documentId } = req.params;
  const { newState } = req.body;

  const query = `
      UPDATE Document 
      SET State = ? 
      WHERE Document_ID = ?
  `;

  db.query(query, [newState, documentId], (error, results) => {
      if (error) {
          console.error('Error updating state:', error);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
      }
      res.json({ message: 'State updated successfully' });
  });
});

 




/* endpoint to store messages (sent by users) in the database */
app.post('/contact', verifyToken, (req, res) => {
  const { name, email, message } = req.body;
  const userId = req.userId; // retrieving the user ID from verifyToken middleware

  // Store message in the database
  const query = 'INSERT INTO Messages (Message, User_ID, Name, E_mail) VALUES (?, ?, ?, ?)';
  db.query(query, [message, userId, name, email], (err, result) => {
      if (err) {
          console.error('Error storing message:', err);
          return res.status(500).send({ message: 'Failed to store message.' });
      }
      // console.log('Message stored successfully:', result);
      res.status(200).send({ message: 'Message stored successfully.' });
  });
});


/* endpoint to fetch new messages count from the Messages table */
app.get('/messages/count', verifyToken, (req, res) => {
  if (req.userType !== 'owner') {
      return res.status(403).send({ message: 'Forbidden' });
  }

  const query = 'SELECT COUNT(*) AS count FROM Messages WHERE seen = 0';

  db.query(query, (err, result) => {
      if (err) {
          console.error('Error fetching new messages count:', err);
          return res.status(500).send({ message: 'Error fetching new messages count' });
      }

      res.send({ count: result[0].count });
  });
});


/* endpoint to mark messages as seen (after owner see the message, Update seen column of Messages table  ) */
app.post('/messages/mark-seen', verifyToken, (req, res) => {
  if (req.userType !== 'owner') {
      return res.status(403).send({ message: 'Forbidden' });
  }

  const query = 'UPDATE Messages SET seen = 1 WHERE seen = 0';

  db.query(query, (err, result) => {
      if (err) {
          console.error('Error marking messages as seen:', err);
          return res.status(500).send({ message: 'Error marking messages as seen' });
      }

      res.send({ message: 'Messages marked as seen' });
  });
});

/* endpoint to fetch messages from Message table to display them in the website */
app.get('/messages', verifyToken, (req, res) => {
  if (req.userType !== 'owner') {
      return res.status(403).send({ message: 'Forbidden' });
  }

  const query = 'SELECT Message_ID, Message, User_ID FROM Messages WHERE seen = 0';

  db.query(query, (err, result) => {
      if (err) {
          console.error('Error fetching messages:', err);
          return res.status(500).send({ message: 'Error fetching messages' });
      }

      res.send(result);
  });
});


// Endpoint to fetch all messages for the owner (with this owner can view past messages also)
app.get('/all-messages', verifyToken, (req, res) => {
  if (req.userType !== 'owner') {
      return res.status(403).send({ message: 'Forbidden' });
  }

  const query = 'SELECT Message_ID, Message, User_ID, Timestamp, Name, E_mail FROM Messages ORDER BY Timestamp DESC';

  db.query(query, (err, result) => {
      if (err) {
          console.error('Error fetching all messages:', err);
          return res.status(500).send({ message: 'Error fetching all messages' });
      }

      res.send(result);
  });
});


//het the Total number of User ID s for the total sign up s
app.get('/total_signups', (req, res) => {
    const sql = "SELECT COUNT(User_ID) AS total_signups FROM User";
    
    db.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database query failed" });
      }
      res.json({ total_signups: result[0].total_signups });
    });
  });
  

  // Promisify the query method
db.query = util.promisify(db.query);

  //Fetch Total Revenue from three tables
  app.get('/total_revenue_and_sales', async (req, res) => {
    try {
      const sum1Query = "SELECT SUM(TotalCost) AS Sum1 FROM Receipt";
      const sum2Query = "SELECT SUM(PurchasePrice * ItemQuantity) AS Sum2 FROM Item";
      const sum3Query = "SELECT SUM(Transaction_Amount) AS Sum3 FROM `Transaction` WHERE IsSuccessful = 1";
      
      const sum1Result = await db.query(sum1Query);
      const sum2Result = await db.query(sum2Query);
      const sum3Result = await db.query(sum3Query);
  
      const sum1 = sum1Result[0].Sum1 || 0;
      const sum2 = sum2Result[0].Sum2 || 0;
      const sum3 = sum3Result[0].Sum3 || 0;
  
      const revenue = sum1 + (sum3 - sum2);
      
      res.json({ total_revenue: revenue, total_sales: sum3 });
    } catch (err) {
      console.error('Error fetching revenue:', err);
      res.status(500).json({ message: "Failed to calculate revenue" });
    }
  });



  // Fetch document processing data
app.get('/document_processing', async (req, res) => {
    try {
      const printingQuery = "SELECT COUNT(Document_ID) AS Printing FROM Document WHERE Service_ID = 1 AND State = 'in progress'";
      const laminatingQuery = "SELECT COUNT(Document_ID) AS Laminating FROM Document WHERE Service_ID = 2 AND State = 'in progress'";
      const typesettingQuery = "SELECT COUNT(Document_ID) AS Typesetting FROM Document WHERE Service_ID = 3 AND State = 'in progress'";
  
      const printingResult = await db.query(printingQuery);
      const laminatingResult = await db.query(laminatingQuery);
      const typesettingResult = await db.query(typesettingQuery);
  
      res.json({
        printing: printingResult[0].Printing || 0,
        laminating: laminatingResult[0].Laminating || 0,
        typesetting: typesettingResult[0].Typesetting || 0,
      });
    } catch (err) {
      console.error('Error fetching document processing data:', err);
      res.status(500).json({ message: "Failed to fetch document processing data" });
    }
  });
  






// Endpoint to get invoice details
app.get('/get-invoice-details', async (req, res) => {
    const { session_id, customer_id } = req.query;

    try {
        const getTransactionSql = `
            SELECT * FROM Transaction
            WHERE Session_ID = ? AND Customer_ID = ?`;

        const [transaction] = await query(getTransactionSql, [session_id, customer_id]);

        if (!transaction) {
            return res.status(404).send({ error: 'Transaction not found' });
        }

        const getCartItemsSql = `
            SELECT Cart.CartQuantity, Item.ItemName, Item.ItemPrice
            FROM Cart
            JOIN Item ON Cart.Item_ID = Item.Item_ID
            WHERE Cart.Customer_ID = ?`;

        const cartItems = await query(getCartItemsSql, [customer_id]);

        res.json({ cartItems, transaction });
    } catch (error) {
        console.error('Error fetching invoice details:', error);
        res.status(500).send({ error: 'Error fetching invoice details' });
    }
});






//run the server
const server = app.listen(3001, () => {
    console.log('server running on port 3001');
    console.log('current server time out value:', server.timeout);
});

// server.setTimeout(10 * 60 * 100);  // uncomment this to set time out to 10 minutes of express server







