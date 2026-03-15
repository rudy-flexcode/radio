import { error } from '@sveltejs/kit';

const ALLOWED_HOSTS = new Set([
	'freedomice.streamakaci.com',
	'exofm.ice.infomaniak.ch',
	'cdn.nrjaudio.fm',
	'streaming.nrjaudio.fm',
	'reunion.ice.infomaniak.ch',
	'sv3.vestaradio.com',
	'srv1.coollabel-productions.com',
	'rslradio.ice.infomaniak.ch'
]);

export async function GET({ url, fetch }) {
	const target = url.searchParams.get('url');
	if (!target) {
		throw error(400, 'Missing url');
	}

	let parsed;
	try {
		parsed = new URL(target);
	} catch {
		throw error(400, 'Invalid url');
	}

	if (!['http:', 'https:'].includes(parsed.protocol)) {
		throw error(400, 'Invalid protocol');
	}

	if (!ALLOWED_HOSTS.has(parsed.hostname)) {
		throw error(403, 'Host not allowed');
	}

	const upstream = await fetch(parsed.toString(), {
		headers: {
			'User-Agent': 'radio-re/1.0',
			'Icy-MetaData': '1'
		}
	});

	if (!upstream.ok || !upstream.body) {
		throw error(upstream.status, 'Upstream error');
	}

	const headers = new Headers(upstream.headers);
	headers.set('Cache-Control', 'no-store');
	headers.set('Access-Control-Allow-Origin', '*');

	return new Response(upstream.body, {
		status: upstream.status,
		headers
	});
}
