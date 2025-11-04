export interface CreateArticleDTO {
  title: string;
  body: string;
}

export interface UpdateArticleDTO {
  title?: string;
  body?: string;
}

export interface CreateUser {
  email: string;
  userName: string;
  name: string;
  password: string;
  isAdmin: boolean;
}
export interface LoginUserDTO {
  email: string;
  password: string;
}
