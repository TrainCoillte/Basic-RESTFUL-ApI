//used REPL.IT to do my assignment and MongoDb Atlas.
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// const connect = require("./connect");       // url from connect module
const connect = require("./connect"); // url from connect module
const client = new MongoClient(connect.database.url, { useUnifiedTopology: true } );

// database name
const dbName = 'Test';

// Use connect method to connect to the server
client.connect(function(err) {
  // using the assert module for testing
  assert.equal(null, err);
  console.log("Connected successfully to server");
//calling all the methods
  const db = client.db(dbName);
  insertCustomer(db, function() {
    findCustomers(db,function() {
    insertPhone(db, function() {
      findPhone(db,function() { 
        insertOrders(db, function() {
          findOrders(db,function() {
        updateCustomer(db,function() {
          updatePhone(db,function() {
            updateOrders(db,function() {
            removeCustomer(db,function() {
              removePhone(db,function() {
                removeOrders(db,function() {
          client.close();
                });
                });
              });
              });
              });
            });
           });
       });
      });
     });
    });
  });
});

//insert methods just put the basic information into each collection and creates the collection if it doesnt already exist
const insertCustomer = function(db, callback) {
  // Using the Customers collection
  const collection = db.collection('Customers');
  // Insert some documents
  collection.insertMany([
    {"title":"Ms","fname":"Alondra","lname":"Dunne","email":"alondra.dunne@purplemail.ie","mobile":"0849937354","home/shipping Address":{"Address Line1":"QK","Address Line2":"Dunham","town":"Naas","county":"Kidare","EIRCODE":"84ru90"}},

    {"title":"Ms","fname":"Hannah","lname":"Johnston","email":"HannahJohnston@gmail.ie","mobile":"0872453641","home/shipping Address":{"Address Line1":"Streetview","Address Line2":"Oldview","town":"Tallaght","county":"Dublin","EIRCODE":"54hy09"}},

    {"title":"Dr","fname":"Bob","lname":"Dylan","email":"iarlaith.kelly@fuchsiamail.ie","mobile":"0843977120","home/shipping Address":{"Address Line1":"Parkaville","Address Line2":"Kilminchy","town":"Portlaoise","county":"Laois","EIRCODE":"57ryj34"}},

    {"title":"Mr","fname":"Roy","lname":"Keane","email":"JamieVardy@chatshitgetbanged.ie","mobile":"085986574","home/shipping Address":{"Address Line1":"Belview","Address Line2":"No.34","town":"Abbeyleix","county":"Laois","EIRCODE":"42rw57"}},

    {"title":"Ms","fname":"Brigid","lname":"Flynn","email":"brigid.flynn@silvermail.ie","mobile":"0844020733","home/shipping Address":{"Address Line1":"Cloosecullen","Address Line2":"Raheen","town":"Mountrath","county":"Laois","EIRCODE":"34RH47"}}
  ], function(err, result) {
    // using the assert module for testing
    assert.equal(err, null);
    assert.equal(5, result.result.n);
    assert.equal(5, result.ops.length);
    // all good if we get to here
    console.log("Inserted 5 Customers into the collection");
    callback(result);
  });
}

const insertPhone = function(db, callback) {
  // Using the Items collection
  const collection = db.collection('Items');
  // Insert some documents
  collection.insertMany([
    {"manufacturer":"Sony","model":"A10","price":"120"},
    {"manufacturer":"Iphone","model":"A11","price":"140"},
    {"manufacturer":"Samsung","model":"A12","price":"130"},
    {"manufacturer":"Huawei","model":"A13","price":"190"},
    {"manufacturer":"Nokia","model":"A14","price":"180"}
  ], function(err, result) {
    // using the assert module for testing
    assert.equal(err, null);
    assert.equal(5, result.result.n);
    assert.equal(5, result.ops.length);
    // all good if we get to here
    console.log("Inserted 5 Phones into the collection");
    callback(result);
  });
}

const insertOrders = function(db,callback)
{
  const collection = db.collection('Orders');
  // Insert some documents
  collection.insertMany([
   { "fname":"Alondra","lname":"Dunne","email":"alondra.dunne@purplemail.ie","home/shipping Address":{"Address Line1":"QK","town":"Naas","county":"Kidare","phone":{"manufacturer":"Samsung","model":"A12","price":"130"}}},

    {"fname":"Roy","lname":"Keane","email":"JamieVardy@chatshitgetbanged.ie","mobile":"085986574","home/shipping Address":{"Address Line1":"Belview","town":"Abbeyleix","county":"Laois","phone":{"manufacturer":"Nokia","model":"A14","price":"180"}}},
  ], function(err, result) {
    // using the assert module for testing
    assert.equal(err, null);
    assert.equal(2, result.result.n);
    assert.equal(2, result.ops.length);
    // all good if we get to here
    console.log("Inserted 2 Orders into the collection");
    callback(result);
  });
}

//The find methods pick a document at random from the collection and print it in the console.
const findCustomers = function(db, callback)
 {
    // Get the Customers collection
    const collection = db.collection('Customers');
    // Find some documents
    console.log("Pick a random Customer");
    collection.aggregate([{ $sample: { size:1}}]).toArray((err,results)=>{
      console.log(results);
      callback(results);
    });
}
const findPhone = function(db, callback)
 {
    // Get the Items collection
    const collection = db.collection('Items');
    // Find some documents
    console.log("Pick a random Phone");
    collection.aggregate([{ $sample: { size:1}}]).toArray((err,results1)=>{
      console.log(results1);
      callback(results1);
    });
}
const findOrders = function(db, callback)
 {
    // Get the Orders collection
    const collection = db.collection('Orders');
    // Find some documents
    console.log("Pick a random Order");
    collection.aggregate([{ $sample: { size:1}}]).toArray((err,results1)=>{
      console.log(results1);
      callback(results1);
    });
}

//the update methods find a document at random and updates the specified areas within that document.
const updateCustomer = function(db, callback) {
    // Get the Customers collection
    const collection = db.collection('Customers');
   //finds random document in collection
    collection.aggregate([{ $sample: { size:1}}]).toArray((err,results1)=>{
      collection.updateOne({_id:results1[0]._id }
      , { $set: { email :  "alondra.dunne@redmail.ie", title : "Ms", town : "Raheen", county : "Laois" } }, function(err, results1) {
      // all good if we get to here
      console.log("");    
      console.log("Updated the consumer: reset email field set to alondra.dunne@redmail.ie,Title to Ms, Town to Raheen, County to Laois");
    //  console.log(results1[0]);
      callback(results1);
    });  
    });
  }
  const updatePhone = function(db, callback) {
    // Get the Items collection
    const collection = db.collection('Items');
    //finds random document in collection
    collection.aggregate([{ $sample: { size:1}}]).toArray((err,results1)=>{
      collection.updateOne({_id:results1[0]._id }
      , { $set: { manufacturer :  "Dash"} }, function(err, results1) {
      // all good if we get to here
      console.log("");    
      console.log("Updated the Phone: reset Manufacturer to Dash");
     // console.log(results1);
      callback(results1);
    });  
    });
  }
  const updateOrders = function(db,callback)
{
   // Get the Orders collection
    const collection = db.collection('Orders');
    //finds random document in collection
    collection.aggregate([{ $sample: { size:1}}]).toArray((err,results1)=>{
      collection.updateOne({_id:results1[0]._id }
      , { $set: {email :  "alondra.dunne@redmail.ie", title : "Ms", town : "Raheen", county : "Laois",manufacturer :  "Dash"} }, function(err, results1) {
      // all good if we get to here
      console.log("");    
      console.log("Updated the Order: reset Manufacturer to Dash, reset email field set to alondra.dunne@redmail.ie,Title to Ms, Town to Raheen, County to Laois");
     // console.log(results1);
      callback(results1);
    });  
    });
}
//The remove methods delete a document based on the details in the original document. I am deleting the updated document as otherwise i can't guarantee to delete any document 
const removeCustomer = function(db, callback) {
    // Get the Customers collection
    const collection = db.collection('Customers');
    // Delete document where email is "alondra.dunne@redmail.ie" firstname Alondra and secondname Dunne
    collection.deleteOne({ fname : "Alondra", lname:"Dunne", email : "alondra.dunne@redmail.ie" }, function(err, result) {
      // all good if we get to here  
      console.log("");    
      console.log("Removed the Consummer with email : 'alondra.dunne@redemail.ie', firstname Alondra and secondname Dunne");
      callback(result);
    });    
}
const removePhone = function(db, callback) {
    // Get the Items collection
    const collection = db.collection('Items');
    // Delete document where manufacturer is Dash
    collection.deleteOne({ manufacturer : "Dash" }, function(err, result) {
      // using the assert module for testing
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      // all good if we get to here      
      console.log("");    
      console.log("Removed the Items with manufacturer:Dash");
      callback(result);
    });    
}
const removeOrders = function(db,callback)
{
   // Get the Orders collection
    const collection = db.collection('Orders');
    // Delete document where email is "alondra.dunne@redmail.ie and manufacturer is Dash"
    collection.deleteOne({fname : "Alondra", lname:"Dunne", email : "alondra.dunne@redmail.ie", manufacturer : "Dash" }, function(err, result) {
      // all good if we get to here      
      console.log("");    
      console.log("Removed the Order with manufacturer:Dash,email : 'alondra.dunne@redemail.ie', firstname Alondra and secondname Dunne");
      callback(result);
    });  
}