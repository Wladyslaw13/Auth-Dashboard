import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
	const token = await getToken({
		req: request,
		secret: process.env.NEXTAUTH_SECRET,
	})

	// Check if the path is the profile page
	if (request.nextUrl.pathname.startsWith('/profile')) {
		console.log(
			`ТОКЕН - ${JSON.stringify(token)} ДАЛЕЕ REQUEST ${JSON.stringify(
				request
			)}`
		)
		if (!token) {
			// Redirect to login if not authenticated
			return NextResponse.redirect(new URL('/login', request.url))
		}
	}

	// Allow public pages
	return NextResponse.next()
}

export const config = {
	matcher: ['/profile/:path*'],
}
