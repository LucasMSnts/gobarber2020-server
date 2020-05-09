// express.d.ts - o "d" seria de definição
declare namespace Express {
  // Reescrevendo tipagem da biblioteca
  export interface Request {
    user: {
      id: string;
    };
  }
}
