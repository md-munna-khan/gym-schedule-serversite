const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())
//gymSchedule
//xthkbThsZX7oJnhm


const uri = "mongodb+srv://gymSchedule:xthkbThsZX7oJnhm@cluster0.gamza.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const gymCollection = client.db("exercise").collection('gym')
    // const exerciseUsers = client.db("exercise").collection('users')
    app.post('/schedule',async(req,res)=>{
      const data = req.body
    const result = await gymCollection.insertOne(data)
      res.send(result)
  })

  app.get('/schedule',async(req,res)=>{
    const result = await gymCollection.find().toArray()
    res.send(result)
  })
  app.delete("/schedule/:id",async(req,res)=>{
    const id = req.params.id;
    const query = {_id: new ObjectId(id)}
    const result=await gymCollection.deleteOne(query)
    res.send(result)
  })
   
  //single data update
  app.get('/schedule/:id',async(req,res)=>{
    const id = req.params.id;
    console.log(id)
    const query = {_id: new ObjectId(id)}
    const result= await gymCollection.findOne(query)
    res.send(result)
  })
  //update
  app.patch('/schedule/:id',async(req,res)=>{
    const id = req.params.id;
    const data = req.body;
    const query = {_id: new ObjectId(id)}
    const update = {
     $set:{
      title:data?.title,
      day:data?.day,
      date:data?.data,
      time:data?.time
     }
    }
    const result =await gymCollection.updateOne(query,update)
    res.send(result)
  })
  //update
  app.patch('/status/:id',async(req,res)=>{
    const id = req.params.id;
    
    const query = {_id: new ObjectId(id)}
    const update = {
     $set:{
      isCompleted:true
     }
    }
    const result =await gymCollection.updateOne(query,update)
    res.send(result)
  })


    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


   
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.log);

app.get('/',(req,res)=>{
    res.send("server is running")
})

app.listen(port, ()=>{
    console.log(`gymShedule server running on port:${port} `)
})