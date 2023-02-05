import { prisma } from "@/config";

async function findMany() {
  return prisma.hotel.findMany();
}

async function findFirst(hotelId: number) {
  return prisma.hotel.findFirst({ where: { id: hotelId }, include: { Rooms: true } });
}

async function findUserHotel(userId: number) {
  return prisma.ticket.findFirst({
    where: {
      Enrollment: {
        userId,
      },
    },
    include: {
      Enrollment: true,
      TicketType: true,
    }
  });
}

const hotelRepository = {
  findMany,
  findFirst,
  findUserHotel,
};

export default hotelRepository;
