const express = require('express');
const path = require('path');

const app = express();

// example api endpoint
// app.get('/api/getList', (req,res) => {
//     var list = ["item1", "item2", "item3"];
//     res.json(list);
//     console.log('Sent list of items');
// });

// redirects any other paths to the client
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.get('*', function(req,res) {
    console.log('trying to redirect to client build')
	res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);