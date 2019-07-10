
const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '8ceb03503dc84c15a909f82d3b1e938b'
});

const handleCall =  (req,res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to get image'));
};

module.exports = {
    handleCall: handleCall
}