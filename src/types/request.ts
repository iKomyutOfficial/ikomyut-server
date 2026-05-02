interface AuthUser {
  role?: string;
  companyId?: string;
  username?: string;
}

export interface RequestWithCompany extends Request {
  companyId: string;
  user?: AuthUser;
}
