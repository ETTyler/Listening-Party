import { GetStaticProps } from 'next';
import prisma from '../../lib/prisma'

export default async function handler(req, res) {
  const id = req.body.id
  const sessions = await prisma.session.findUnique({
    where: {
      id: id
    }
  })
  res.status(200).json({ sessions })
}

