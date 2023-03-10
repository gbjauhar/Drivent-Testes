import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";
import hotelService from "@/services/hotels-service";
import { Response } from "express";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const hotels = await hotelService.listAllHotels(+userId);
    return res.status(httpStatus.OK).send(hotels);
  } catch (err) {
    if(err.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (err.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    if(err.name === "PaymentRequired") {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
    return res.status(httpStatus.BAD_REQUEST).send(err);
  }
}

export async function getRooms(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { hotelId } = req.params;
  try {
    const rooms = await hotelService.listAllRooms(userId, parseInt(hotelId));
    return res.status(httpStatus.OK).send(rooms);
  } catch (err) {
    if(err.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (err.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    if(err.name === "PaymentRequired") {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
