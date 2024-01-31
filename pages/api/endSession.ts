import prisma from '../../lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = JSON.parse(req.body)
  const id = body.id
  const deleteSession = await prisma.session.delete({
    where: {
      id: id
    }
  })
  res.status(200).json({message: 'Session Successfully Ended'})
}
