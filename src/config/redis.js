const redis = require('redis');
const client = redis.createClient({
	url: process.env.REDIS_URI,
	disableOfflineQueue: true,
	pingInterval: 4 * 60 * 1000, //ping every 4 minute to keep alive before timeout
	socket: {
		reconnectStrategy: function (retries) {
			console.error(`${retries} : RECONNECTING  TO REDIS SERVER : `)
			// retries > 4 = wait 10 second
			if (retries > 4) {
				return 10 * 1000;
			}
			//try reconnect retries * 1000
			return retries * 1000
		},
	},
})
	.on("connect", () => console.error(`Connecting To Redis Server..`))
	.on("ready", () => console.error(`Redis Aready Connected`))
	.on("error", (err) => console.error("ERROR REDIS. ", err.message,));
  (async ()=>{
    //prevent server stopped
    try {
      //initial connection
      await client.connect()
    } catch (err) {
        console.error(new Date().toJSON(), ' : RE/CONNECT TO REDIS SERVER FAILED ', err);
    }
  })()


module.exports = client;
