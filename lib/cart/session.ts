import { isEmpty } from "..";

export const getSession = () => {
	return localStorage.getItem( 'x-wc-session' );
}

export const storeSession = ( session: any ) => {
	if ( isEmpty( session ) ) {
		return null;
	}
	localStorage.setItem( 'x-wc-session', session );
}