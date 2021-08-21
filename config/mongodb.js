const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('dababase is successfully connected!!')
}).catch((error) => {    
    console.log(error)
})

