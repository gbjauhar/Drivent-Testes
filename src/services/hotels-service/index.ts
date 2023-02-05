import { notFoundError } from "@/errors";
import hotelRepository from "@/repositories/hotel-repository";
import { paymentRequired } from "@/errors/payment-error";

async function listAllHotels(userId: number) {
  await verifyHotel(userId);
  const hotels = await hotelRepository.findMany();
  if(!hotels.length) {
    throw notFoundError();
  }
  return hotels;
}

async function listAllRooms(userId: number, hotelId: number) {
  await verifyHotel(userId);
  const rooms = await hotelRepository.findFirst(hotelId);
  if(!rooms) {
    throw notFoundError();
  }
  return rooms;
}

async function verifyHotel(userId: number) {
  const ticket = await hotelRepository.findUserHotel(userId);
  if(!ticket) {
    throw notFoundError();
  }
  if(ticket.status !== "PAID" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw paymentRequired();
  }
}

const hotelService = {
  listAllHotels,
  listAllRooms,
};

export default hotelService;
