type ArticleRawData = {
  id: string;
  title: string;
  content: string;
  category: CategoryRawData;
};

type CategoryRawData = {
  id: string;
  title: string;
  description: string;
};

interface ArticleService {
  getAllArticles(): Promise<ArticleRawData[]>;
  getArticleById(id: string): Promise<ArticleRawData | null>;
  getArticlesForCategory(categoryId: string): Promise<ArticleRawData[]>;
  createArticle(article: ArticleRawData): Promise<void>;
}

interface CategoryService {
  getAllCategories(): Promise<CategoryRawData[]>;
  getCategoryById(id: string): Promise<CategoryRawData | null>;
  createCategory(category: CategoryRawData): Promise<void>;
}

class BlogService {
  private _articleService: ArticleService;
  private _categoryService: CategoryService;

  constructor(articleService: ArticleService, categoryService: CategoryService) {
    this._articleService = articleService;
    this._categoryService = categoryService;
  }

  async getArticles() {
    return this._articleService.getAllArticles();
  }

  async getSingleArticle(id: string) {
    return this._articleService.getArticleById(id);
  }

  async getCategories() {
    return this._categoryService.getAllCategories();
  }

  async getSingleCategory(id: string) {
    return this._categoryService.getCategoryById(id);
  }

  async getArticlesForCategory(categoryId: string) {
    return this._articleService.getArticlesForCategory(categoryId);
  }
}

export {};
