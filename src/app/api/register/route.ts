import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const { name, email, password } = await request.json()

		if (!email || !password || !name) {
			return NextResponse.json(
				{ message: 'All fields are required' },
				{ status: 400 }
			)
		}

		const existingUser = await prisma.user.findUnique({
			where: { email },
		})

		if (existingUser) {
			return NextResponse.json(
				{ message: 'User with this email already exists' },
				{ status: 409 }
			)
		}

		const hashedPassword = await bcrypt.hash(password, 10)

		const user = await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
			},
		})

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
