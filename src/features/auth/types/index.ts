export interface User {
  id: number;
  username: string;
  email: string;
  imageUrl: string | null;
}

export interface SignUpProps {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}
