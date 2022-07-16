import prisma from '../../lib/prisma'

export default async function handler(req, res) {
  const body = JSON.parse(req.body)
  const id = body.id
  const session = await prisma.session.findUnique({
    where: {
      id: id
    }
  })
  if (session) {
    res.send({session, message: "Invalid Session ID", success: true})
  }
  else {
    res.status(404).send({ message: "Invalid Session ID", success: false})
  }
}