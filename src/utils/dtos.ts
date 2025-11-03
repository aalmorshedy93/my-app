export interface CreateArticleDTO {
  title: string;
  body: string;
}

export interface UpdateArticleDTO {
  title?: string;
  body?: string;
}
