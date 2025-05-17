import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const { name, email, password } = await request.json()

		// Validate input
		if (!email || !password) {
			return NextResponse.json(
				{ message: 'Email and password are required' },
				{ status: 400 }
			)
		}

		// Check if user already exists
		const existingUser = await prisma.user.findUnique({
			where: { email },
		})

		if (existingUser) {
			return NextResponse.json(
				{ message: 'User with this email already exists' },
				{ status: 400 }
			)
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 10)

		// Create user
		const user = await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
			},
		})

		// Return user without password
		return NextResponse.json(
			{
				id: user.id,
				name: user.name,
				email: user.email,
			},
			{ status: 201 }
		)
	} catch (error) {
		console.error('Registration error:', error)
		return NextResponse.json(
			{ message: 'Something went wrong' },
			{ status: 500 }
		)
	}
}
