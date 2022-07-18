import prisma from '../../lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = JSON.parse(req.body)
  const authCode = body.authCode
  const id = body.id
  const sessions = await prisma.session.create({
    data: {
      id: id,
      authCode: authCode
    }
  })
  res.status(200).json({message: 'Session Successfully Created'})
}