import  dayjs  from "dayjs";
import { faker } from "@faker-js/faker";
import { prisma } from "./../../src/config/database";
import { Hotel } from "@prisma/client";

export function createHotel(params: Partial<Hotel> = {}): Promise<Hotel> {
  return prisma.hotel.create({
    data: {
      name: params.name || faker.lorem.word(),
      image: params.image || faker.image.imageUrl(),
      createdAt: params.createdAt || dayjs().subtract(1, "day").toDate(),
      updatedAt: params.updatedAt || dayjs().add(5, "days").toDate(),
      Rooms: [
        {
          id: hotel.Rooms[0].id,
          name: hotel.Rooms[0].name,
          capacity: hotel.Rooms[0].capacity,
          hotelId: hotel.Rooms[0].hotelId,
          createdAt: hotel.Rooms[0].createdAt.toISOString(),
          updatedAt: hotel.Rooms[0].updatedAt.toISOString(),
        }]
    },
  });
}
  
