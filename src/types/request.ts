export interface RequestWithCompany extends Request {
  companyId: string;
  role?: string;
  username?: string;
}
