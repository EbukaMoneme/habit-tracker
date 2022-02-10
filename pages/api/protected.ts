import { supabase } from "../../utils/supabase";

export async function getServerSideProps({ req }) {
	const { user } = await supabase.auth.api.getUserByCookie(req)

	if (!user) {
		return { props: {}, redirect: { destination: '/sign-in' }}
	}
	
	// do something with the user
	return { props: {user} }
}