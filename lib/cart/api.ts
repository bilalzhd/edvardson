import { isEmpty } from '..';
import { getSession } from './session';

export const getApiCartConfig = () => {
	
	const config: any = {
		headers: {
			'X-Headless-CMS': true,
		},
	}
	
	const storedSession = getSession();
	
	if ( !isEmpty( storedSession ) ) {
		config.headers['x-wc-session'] = storedSession;
	}
	
	return config;
}