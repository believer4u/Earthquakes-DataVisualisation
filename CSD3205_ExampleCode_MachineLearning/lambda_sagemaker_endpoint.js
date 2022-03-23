//Import AWS
let AWS = require("aws-sdk");

//Data that we are going to send to endpoint
//REPLACE THIS WITH YOUR OWN DATA!
let endpointData = {
    "instances":
        [
            {
                "start":"2019-04-03 05:00:00",
                "target": [851.7006143763746,848.3943181920682,818.4213162809712,840.5151277206973,824.1881034683449,898.103883020046,917.3490269314746,905.5083703711119,869.5147127700981,929.9945065994183,972.2914289920279,964.7261339967483,1001.6726315570656,933.2793787155749,952.7010320918694,961.0465418803935,946.5457364585508,919.7261951185901,979.8785033555328,984.6983794525313,966.7847922947948,946.3176055435016,860.8459806238944,895.749076280294,868.9550704872237,864.3662744494866,842.5715807721396,905.1133310005122,866.5917298995431,898.8897600055104,872.3731745529728,922.4130632930152,943.3405236863933,970.0586354887735,935.822615517676,951.2713092966537,1050.494340396058,1018.8276251369997,978.0637070726772,965.8111544729536,1057.3116300217707,1000.7182578676131,958.9553342968294,932.7994901371814,990.1285248214792,975.6562243776874,961.6180594371505,900.5561287500817,876.8467152603232,914.6249139204239,904.1392423930529,943.2170717370951,884.1118745472972,937.3966705950555,958.1210866172914,949.3782862068847,986.9165804575877,977.7179748876916,1030.575682678709,1076.8434198391328,1091.0765955217867,1043.4244769731868,1084.7897431426775,1066.1574400028758,1050.7816806769133,1089.09354739013,1037.5432934652274,971.8036786016703,962.8543628338392,1008.2928459502649,964.3057390354198,978.9255952236301,984.3385772573124,931.0695941334452,966.249524389743,915.6188895823338,928.3425524318376,964.643773365851,965.2667602538943,980.73173581156,1068.5613891783444,1059.761775408875,1018.9445337249402,1075.049558534136,1065.569039063531,1095.3996781990652,1103.0901888714823,1120.362709900913,1102.186206001191,1036.0079058113274,1095.6747335936536,1050.7509421742898,1004.9236532904008,993.6389509605236,1037.4943280092004,962.2015191375529,951.1186416043975,1001.1936625826493,980.9369652181474,1019.8258353805061]
            }
        ],
    "configuration":
        {
            "num_samples": 50,
            "output_types":["mean","quantiles","samples"],
            "quantiles":["0.1","0.9"]
        }
};

//Name of endpoint
//REPLACE THIS WITH THE NAME OF YOUR ENDPOINT
const endpointName = "synth1-endpoint";

//Parameters for calling endpoint
let params = {
    EndpointName: endpointName,
    Body: JSON.stringify(endpointData),
    ContentType: "application/json",
    Accept: "application/json"
};

//AWS class that will query endpoint
let awsRuntime = new AWS.SageMakerRuntime({});

//Handler for Lambda function
exports.handler = event => {
    //Call endpoint and handle response
    awsRuntime.invokeEndpoint(params, (err, data)=>{
        if (err) {//An error occurred
            console.log(err, err.stack);

            //Return error response
            const response = {
                statusCode: 500,
                body: JSON.stringify('ERROR: ' + JSON.stringify(err)),
            };
            return response;
        }
        else{//Successful response
            //Convert response data to JSON
            let responseData = JSON.parse(Buffer.from(data.Body).toString('utf8'));
            console.log(JSON.stringify(responseData));

            //TODO: STORE DATA IN PREDICTION TABLE

            //Return successful response
            const response = {
                statusCode: 200,
                body: JSON.stringify('Predictions stored.'),
            };
            return response;
        }
    });
};

