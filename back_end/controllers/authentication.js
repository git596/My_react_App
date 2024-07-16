// const db = require('../middleware/config');

// const authentication = {
//   register: async (req, res) => {
//     try {
//       const { Email, Password, Confirmpassword } = req.body;
//       const sql = 'INSERT INTO User (Email, Password, Username) VALUES (?,?,?)';
//       db.query(sql, [Email, Password, Confirmpassword], (err, result) => {
//         if (err) {
//           res.status(500).send(err);
//         } else {
//           res.send({ message: 'User added!' });
//         }
//       });
//     } catch (error) {
//       res.status(500).send(error.message);
//     }
//   },

//   login: async (req, res) => {
//     try {
//       const { Email, Password } = req.body;
//       const sql = 'SELECT * FROM User WHERE Email = ? AND Password = ?';
//       db.query(sql, [Email, Password], (err, result) => {
        
//         if (err) {
//             res.send({error: err})
//         }if (result.length > 0) {
//             res.send(result)
//         }
        
//         else {
//             console.log('wrong credentials')
//             res.send({message:'wrong credentials'})
//         }
//       });
//     } catch (error) {
//       res.status(500).send(error.message);
//     }
//   }
// };

// module.exports = authentication;
