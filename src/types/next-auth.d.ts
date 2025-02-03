import "next-auth";

declare module "next-auth" {
  interface Session {
    token: string;
    user: {
      id: number;
      name: string;
      username: string;
      email: string;
      cpf: string;
      phone: string;
      birth_date: string;
      photo: string;
      employee_id: number;
    };
  }

    
}
