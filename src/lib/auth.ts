import { PrismaAdapter } from '@auth/prisma-adapter'
import bcrypt from 'bcrypt'
import { NextAuthOptions } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from './prisma'

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'vladislav@mail.com',
				},
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					return null
				}

				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email,
					},
				})

				if (!user) {
					console.log('User not found in credentials')
					return null
				}

				const isPasswordValid = await bcrypt.compare(
					credentials.password,
					user.password
				)

				if (!isPasswordValid) {
					return null
				}

				return {
					id: user.id,
					email: user.email,
					name: user.name,
				}
			},
		}),
	],
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		async jwt({ token, user }): Promise<JWT> {
			if (user) {
				token.email = user.email ?? ''
				token.id = user.id
				token.name = user.name ?? ''
			}

			return token
		},
		async session({ session, token }) {
			return {
				...session,
				user: {
					...session.user,
					email: token.email,
					id: token.id,
					name: token.name,
				},
			}
		},
	},
}
