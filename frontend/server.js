const express = require('express');
const app = express();

app.use(express.static('./dist/dgsin-2122-08-front'));

app.get('/*', function(req, res) {
    res.sendFile('index.html', { root: './dist/dgsin-2122-08-front/' });
});

app.listen(process.env.PORT || 8080, () => {
    console.log("Server ready");
}).on("error", (e) => {
    console.error("Server NOT ready!");
});
