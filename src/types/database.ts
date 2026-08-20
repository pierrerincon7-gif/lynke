export type UserRole = 'owner' | 'admin' | 'customer';

export interface Profile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  businessId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Business {
  id: string;
  slug: string;
  name: string;
  businessType: string;
  city: string;
  logoUrl?: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  businessId: string;
  name: string;
  email?: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export type LoyaltyProgramType = 'points' | 'stamps';

export interface LoyaltyProgram {
  id: string;
  businessId: string;
  name: string;
  type: LoyaltyProgramType;
  pointsRequired: number;
  conditions?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoyaltyCard {
  id: string;
  businessId: string;
  customerId: string;
  points: number;
  visits: number;
  createdAt: string;
  updatedAt: string;
}

export interface Reward {
  id: string;
  businessId: string;
  name: string;
  description?: string;
  requiredPoints: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export type TransactionType = 'earn_points' | 'redeem_reward' | 'visit';

export interface Transaction {
  id: string;
  businessId: string;
  customerId: string;
  type: TransactionType;
  points: number;
  description: string;
  createdAt: string;
}

export interface RegisterOwnerInput {
  name: string;
  email: string;
  password: string;
  businessName: string;
  businessType: string;
  city: string;
}
