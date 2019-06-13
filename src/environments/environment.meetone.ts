const chain 	= 'cfe6486a83bad4962f232d48003b1824ab5665c36778141034d75e57b956e422'; 
const protocol  = 'https';
const host 		= 'api.meetsweden.org';
export const environment = {
	production: true,
	marketUrl: "https://meetone.simplemarket.io",
	appName: 'Meetone Kolobok Game',
	gcontract: 'kolobok.m',
	asset: 'smplassets.m',
	market:'smplmarket.m',
	tables: {
		assets: 'sassets',
		claims: 'offers',
		babies: 'babys'
	},
	network : {
    	blockchain: 'eos',
    	host,
    	protocol,
    	port: 443,
    	expireInSeconds: 120,
    	chainId: chain
	},
	chain: chain,
	Eos: {
		httpEndpoint: `${protocol}://${host}`,
		chainId: chain,
		verbose: false
	},
	version: '1.0.0',
	style: {
		body: { 
			background: "url('./imgs/section-background.svg') 50% 17vh no-repeat,linear-gradient(to left top, #218838bf, #218838) 0 0 no-repeat"
		},
		ukLabel: {
			background: "#fb3186"
		},
		ukButtonPrimary: {
			color: "#fff",
			background: 'rgb(251, 49, 134, 0.8)',
			border: '1px solid #fb3186',
			'box-shadow': 'none',
			'font-size': '16px',
			'font-weight': 'bold',
		},
		logoText: 'MEETONE KOLOBOK'
	}
};