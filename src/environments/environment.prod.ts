const chain 	= 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'; 
const protocol  = 'https';
const host 		= 'bp.cryptolions.io';
export const environment = {
	production: true,
	marketUrl: "https://simplemarket.io",
	appName: 'Kolobok Game',
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
		logoText: 'KOLOBOK'
	}
};