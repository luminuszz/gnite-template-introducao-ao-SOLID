import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    try {
      const { user_id: currentUserLoggedId } = request.headers;

      const usersList = this.listAllUsersUseCase.execute({
        user_id: currentUserLoggedId as string,
      });

      return response.status(200).json(usersList);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { ListAllUsersController };
