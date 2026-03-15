export type Station = {
	id: string;
	name: string;
	short: string;
	description: string;
	stream: string;
	proxy?: boolean;
	accent: string;
};

export const stations: Station[] = [
	{
		id: 'freedom-1',
		name: 'Free Dom 1',
		short: 'FD1',
		description: 'Actualite locale',
		stream: 'http://freedomice.streamakaci.com/freedom.mp3',
		accent: '#f97316'
	},
	{
		id: 'freedom-2',
		name: 'Free Dom 2',
		short: 'FD2',
		description: 'Debats et direct',
		stream: 'http://freedomice.streamakaci.com/freedom2.mp3',
		accent: '#fb7185'
	},
	{
		id: 'exo-fm',
		name: 'Exo FM',
		short: 'EXO',
		description: 'Musique soleil',
		stream: 'http://exofm.ice.infomaniak.ch/exofm-64.aac',
		proxy: true,
		accent: '#22d3ee'
	},
	{
		id: 'nrj-reunion',
		name: 'NRJ Reunion',
		short: 'NRJ',
		description: 'Hits du moment',
		stream: 'https://streaming.nrjaudio.fm/ougonmrb92oc?origine=fluxradios',
		accent: '#facc15'
	},
	{
		id: 'reunion-1ere',
		name: 'Reunion 1ere',
		short: '1ERE',
		description: 'Service public',
		stream: 'https://reunion.ice.infomaniak.ch/reunion-128.mp3',
		accent: '#38bdf8'
	},
	{
		id: 'radio-pikan',
		name: 'Radio Pikan',
		short: 'PKN',
		description: 'Musique locale',
		stream: 'https://sv3.vestaradio.com/RADIOPIKAN',
		proxy: true,
		accent: '#a3e635'
	},
	{
		id: 'radio-sud-plus',
		name: 'Radio Sud Plus',
		short: 'RS+',
		description: 'Radio libre sud',
		stream: 'http://srv1.coollabel-productions.com:8040/',
		proxy: true,
		accent: '#34d399'
	},
	{
		id: 'rsl-radio',
		name: 'RSL Radio',
		short: 'RSL',
		description: 'Zouk et hits',
		stream: 'http://rslradio.ice.infomaniak.ch/rslradio-128.mp3',
		accent: '#f59e0b'
	}
];
