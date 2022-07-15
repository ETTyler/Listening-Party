import prisma from '../../lib/prisma'

export default async function handler(req, res) {
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