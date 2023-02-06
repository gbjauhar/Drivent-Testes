import { faker } from "@faker-js/faker";
import { prisma } from "./../../src/config/database";
import { Hotel, Room } from "@prisma/client";

export function createHotel(params: Partial<Hotel> = {}): Promise<Hotel & {Rooms: Room[]}> {
  return prisma.hotel.create({
    data: {
      id: 1,
      name: params.name || faker.name.findName(),
      image: params.image || faker.image.imageUrl(),
      Rooms: {
        createMany: {
          data: [{
            name: faker.name.findName(),
            capacity: faker.datatype.number()
          }],
        } }
    }, include: {
      Rooms: true
    }
  });
}
