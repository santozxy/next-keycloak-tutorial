export interface Auth {
  token: string;
  user: {
    birth_date: string;
    cpf: string;
    email: string;
    employee_id: number;
    id: number;
    name: string;
    phone: string;
    photo: string;
    username: string;
  };
}
