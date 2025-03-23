import { PLAID_CLIENT_ID, PLAID_SECRET } from '$env/static/private';
import { Configuration, PlaidEnvironments, PlaidApi } from 'plaid';

const config = new Configuration({
	basePath: PlaidEnvironments.sandbox,
	baseOptions: {
		headers: {
			'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
			'PLAID-SECRET': PLAID_SECRET,
			'Plaid-Version': '2020-09-14'
		}
	}
});

export const plaid = new PlaidApi(config);
