import { PrismaClient, UserRole } from '@prisma/client'

const prisma = new PrismaClient()

// eslint-disable-next-line max-len
const passwordHash = '9b39911c178b3f399b5a8b4b2a57aee3f7c92de94ebadee6413e79ff977684dacb2542c1ebd631f824987bf7ae0ccf1212e0aa013b60b0efdbf5fff9737ff89c' // CoolPassword9

main()

async function main() {
  let user

  // eslint-disable-next-line prefer-const
  user = await prisma.user.create({
    data: {
      name: 'Nancy',
      email: 'admin@example.com',
      roles: [UserRole.ADMIN],
      password: passwordHash,
    },
  })
  // console.log(`added admin:\n`, user)

  console.log('User seed completed.')
  prisma.$disconnect
  process.exit(0)
}
