import { IRes, apiService } from "./ApiServices";

export interface IUser{
  name: string,
  score:number
}

const gameService = {
  getAllUsers: (): IRes<IUser[]> => apiService.get("api/scores"),
  setUser: (data: IUser): IRes<IUser> => apiService.post("api/scores", data)
};

export { gameService };
