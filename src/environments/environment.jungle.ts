const chain 	= 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473'; 
const protocol  = 'https';
const host 		= 'jungle2.cryptolions.io';
export const environment = {
	production: true,
	marketUrl: "https://jungle.simplemarket.io",
	appName: 'Jungle Kolobok Game',
	gcontract: 'ilovekolobok',
	asset: 'simpleassets',
	market: 'simplemarket',
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
		logoText: 'JUNGLE KOLOBOK'
	}
};