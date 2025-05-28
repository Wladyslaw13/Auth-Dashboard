import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
	const env = process.env.VERCEL_ENV

	if (env === 'development' || env === 'preview') {
		const username = process.env.DEV_AUTH_USERNAME || ''
		const password = process.env.DEV_AUTH_PASSWORD || ''
		const basicAuth = request.headers.get('authorization')
		const expected = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64')

		if (basicAuth !== expected) {
			return new NextResponse('Unauthorized', {
				status: 401,
				headers: {
					'WWW-Authenticate': 'Basic realm="Secure Dev/Preview Area"'
				}
			})
		}
	}

	if (request.nextUrl.pathname.startsWith('/profile')) {
		const token = await getToken({
			req: request,
			secret: process.env.NEXTAUTH_SECRET
		})

		if (!token) {
			return NextResponse.redirect(new URL('/login', request.url))
		}
	}

	if (request.nextUrl.pathname.startsWith('/login')) {
		const token = await getToken({
			req: request,
			secret: process.env.NEXTAUTH_SECRET
		})

		if (token) {
			return NextResponse.redirect(new URL('/profile', request.url))
		}
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/profile/:path*', '/((?!_next|favicon.ico|api).*)']
}
