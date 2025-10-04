import React from 'react'

const AuthPage = () => {
  return (
	<div>
		<h2>Confirm your signup</h2>
	<p>Follow this link to confirm your user:</p>
	<p>
	<a
		href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email&next={{ .RedirectTo }}"
		>Confirm your emai
		l</a>
	</p>
	</div>
  )
}

export default AuthPage