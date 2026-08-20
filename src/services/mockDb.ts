import {
  Profile,
  Business,
  Customer,
  LoyaltyProgram,
  LoyaltyCard,
  Reward,
  Transaction,
  RegisterOwnerInput,
} from '@/types/database';

// Local storage key helper
const STORAGE_KEY = 'loyalify_db_v1';

interface DBState {
  profiles: Profile[];
  businesses: Business[];
  customers: Customer[];
  loyaltyPrograms: LoyaltyProgram[];
  loyaltyCards: LoyaltyCard[];
  rewards: Reward[];
  transactions: Transaction[];
  currentSession: {
    userId: string;
    businessId: string;
  } | null;
}

const getInitialDB = (): DBState => {
  const initialNegocioA: Business = {
    id: 'biz-negocio-a',
    slug: 'cafeteria-artesanal',
    name: 'Cafetería Artesanal Aroma',
    businessType: 'Cafetería & Pastelería',
    city: 'Madrid',
    logoUrl: '',
    ownerId: 'user-owner-a',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const initialNegocioB: Business = {
    id: 'biz-negocio-b',
    slug: 'barberia-classic',
    name: 'Barbería El Corte Clásico',
    businessType: 'Belleza & Estética',
    city: 'Barcelona',
    logoUrl: '',
    ownerId: 'user-owner-b',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return {
    profiles: [
      {
        id: 'user-owner-a',
        name: 'Carlos Mendoza',
        email: 'carlos@aroma.com',
        role: 'owner',
        businessId: 'biz-negocio-a',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'user-owner-b',
        name: 'Sofía Rodríguez',
        email: 'sofia@elcorte.com',
        role: 'owner',
        businessId: 'biz-negocio-b',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    businesses: [initialNegocioA, initialNegocioB],
    customers: [
      {
        id: 'cust-1',
        businessId: 'biz-negocio-a',
        name: 'Laura García',
        email: 'laura@gmail.com',
        phone: '+34611223344',
        createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'cust-2',
        businessId: 'biz-negocio-a',
        name: 'Alejandro Gómez',
        email: 'alejandro@gmail.com',
        phone: '+34622334455',
        createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'cust-3',
        businessId: 'biz-negocio-b',
        name: 'David Martí',
        email: 'david@gmail.com',
        phone: '+34633445566',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    loyaltyPrograms: [
      {
        id: 'lp-a',
        businessId: 'biz-negocio-a',
        name: 'Club Café Frecuente',
        type: 'stamps',
        pointsRequired: 8,
        conditions: 'Valido con la compra de cualquier bebida de especialidad.',
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'lp-b',
        businessId: 'biz-negocio-b',
        name: 'Puntos Barber VIP',
        type: 'points',
        pointsRequired: 100,
        conditions: 'Acumulas 10 puntos por cada corte o arreglo de barba.',
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    loyaltyCards: [
      {
        id: 'card-1',
        businessId: 'biz-negocio-a',
        customerId: 'cust-1',
        points: 6,
        visits: 6,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'card-2',
        businessId: 'biz-negocio-a',
        customerId: 'cust-2',
        points: 3,
        visits: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'card-3',
        businessId: 'biz-negocio-b',
        customerId: 'cust-3',
        points: 40,
        visits: 4,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    rewards: [
      {
        id: 'rew-1',
        businessId: 'biz-negocio-a',
        name: 'Café de Especialidad Gratis',
        description: 'Disfruta un café o capuchino gratis de cualquier tamaño.',
        requiredPoints: 8,
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'rew-2',
        businessId: 'biz-negocio-a',
        name: 'Torta de la Casa',
        description: 'Porción de tarta artesanal a elección.',
        requiredPoints: 12,
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'rew-3',
        businessId: 'biz-negocio-b',
        name: 'Corte de Cabello Gratis',
        description: 'Incluye lavado y peinado profesional.',
        requiredPoints: 100,
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    transactions: [
      {
        id: 'tx-1',
        businessId: 'biz-negocio-a',
        customerId: 'cust-1',
        type: 'earn_points',
        points: 1,
        description: 'Sello acumulado por compra de Capuchino',
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      },
      {
        id: 'tx-2',
        businessId: 'biz-negocio-a',
        customerId: 'cust-2',
        type: 'earn_points',
        points: 1,
        description: 'Sello acumulado por compra de Latte',
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      },
      {
        id: 'tx-3',
        businessId: 'biz-negocio-b',
        customerId: 'cust-3',
        type: 'earn_points',
        points: 10,
        description: 'Puntos ganados por servicio de Corte + Barba',
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      },
    ],
    currentSession: {
      userId: 'user-owner-a',
      businessId: 'biz-negocio-a',
    },
  };
};

class MockDatabase {
  private loadDB(): DBState {
    if (typeof window === 'undefined') return getInitialDB();
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const initial = getInitialDB();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return getInitialDB();
    }
  }

  private saveDB(state: DBState) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }

  // Auth Operations
  registerOwner(input: RegisterOwnerInput): { profile: Profile; business: Business } {
    const db = this.loadDB();
    const existing = db.profiles.find((p) => p.email.toLowerCase() === input.email.toLowerCase());
    if (existing) {
      throw new Error('El correo electrónico ya está registrado.');
    }

    const userId = 'user-' + Date.now();
    const businessId = 'biz-' + Date.now();
    const slug = input.businessName
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'negocio-' + Date.now();

    const business: Business = {
      id: businessId,
      slug,
      name: input.businessName,
      businessType: input.businessType,
      city: input.city,
      ownerId: userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const profile: Profile = {
      id: userId,
      name: input.name,
      email: input.email,
      role: 'owner',
      businessId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const program: LoyaltyProgram = {
      id: 'lp-' + Date.now(),
      businessId,
      name: `Programa de Fidelización ${input.businessName}`,
      type: 'stamps',
      pointsRequired: 10,
      conditions: 'Acumula sellos en cada compra.',
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const initialReward: Reward = {
      id: 'rew-' + Date.now(),
      businessId,
      name: 'Premio de Bienvenida',
      description: 'Cortesía especial por ser cliente frecuente.',
      requiredPoints: 10,
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    db.profiles.push(profile);
    db.businesses.push(business);
    db.loyaltyPrograms.push(program);
    db.rewards.push(initialReward);
    db.currentSession = { userId, businessId };

    this.saveDB(db);
    return { profile, business };
  }

  loginOwner(email: string): { profile: Profile; business: Business } {
    const db = this.loadDB();
    const profile = db.profiles.find((p) => p.email.toLowerCase() === email.toLowerCase());
    if (!profile) {
      throw new Error('Credenciales inválidas. Usuario no encontrado.');
    }
    const business = db.businesses.find((b) => b.id === profile.businessId);
    if (!business) {
      throw new Error('No se encontró un negocio asociado a esta cuenta.');
    }

    db.currentSession = { userId: profile.id, businessId: business.id };
    this.saveDB(db);

    return { profile, business };
  }

  logoutOwner() {
    const db = this.loadDB();
    db.currentSession = null;
    this.saveDB(db);
  }

  getCurrentSession(): { profile: Profile; business: Business } | null {
    const db = this.loadDB();
    if (!db.currentSession) return null;
    const profile = db.profiles.find((p) => p.id === db.currentSession?.userId);
    const business = db.businesses.find((b) => b.id === db.currentSession?.businessId);
    if (!profile || !business) return null;
    return { profile, business };
  }

  // Business Operations
  getBusinessById(businessId: string): Business | null {
    const db = this.loadDB();
    return db.businesses.find((b) => b.id === businessId) || null;
  }

  getBusinessBySlug(slug: string): Business | null {
    const db = this.loadDB();
    return db.businesses.find((b) => b.slug === slug) || null;
  }

  updateBusiness(businessId: string, updates: Partial<Business>): Business {
    const db = this.loadDB();
    const idx = db.businesses.findIndex((b) => b.id === businessId);
    if (idx === -1) throw new Error('Negocio no encontrado');

    db.businesses[idx] = {
      ...db.businesses[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    this.saveDB(db);
    return db.businesses[idx];
  }

  // Customers Operations
  getCustomers(businessId: string): (Customer & { points: number; visits: number })[] {
    const db = this.loadDB();
    const bizCustomers = db.customers.filter((c) => c.businessId === businessId);

    return bizCustomers.map((c) => {
      const card = db.loyaltyCards.find((lc) => lc.businessId === businessId && lc.customerId === c.id);
      return {
        ...c,
        points: card ? card.points : 0,
        visits: card ? card.visits : 0,
      };
    });
  }

  addCustomer(businessId: string, input: { name: string; email?: string; phone: string }): Customer {
    const db = this.loadDB();
    const existing = db.customers.find((c) => c.businessId === businessId && c.phone === input.phone);
    if (existing) {
      return existing;
    }

    const customer: Customer = {
      id: 'cust-' + Date.now(),
      businessId,
      name: input.name,
      email: input.email,
      phone: input.phone,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const card: LoyaltyCard = {
      id: 'card-' + Date.now(),
      businessId,
      customerId: customer.id,
      points: 1, // Start with 1 welcome point
      visits: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const transaction: Transaction = {
      id: 'tx-' + Date.now(),
      businessId,
      customerId: customer.id,
      type: 'earn_points',
      points: 1,
      description: 'Bienvenida al programa de fidelización',
      createdAt: new Date().toISOString(),
    };

    db.customers.push(customer);
    db.loyaltyCards.push(card);
    db.transactions.push(transaction);

    this.saveDB(db);
    return customer;
  }

  updateCustomer(businessId: string, customerId: string, updates: Partial<Customer>): Customer {
    const db = this.loadDB();
    const idx = db.customers.findIndex((c) => c.id === customerId && c.businessId === businessId);
    if (idx === -1) throw new Error('Cliente no encontrado o no pertenece a este negocio');

    db.customers[idx] = {
      ...db.customers[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    this.saveDB(db);
    return db.customers[idx];
  }

  deleteCustomer(businessId: string, customerId: string) {
    const db = this.loadDB();
    db.customers = db.customers.filter((c) => !(c.id === customerId && c.businessId === businessId));
    db.loyaltyCards = db.loyaltyCards.filter((lc) => !(lc.customerId === customerId && lc.businessId === businessId));
    db.transactions = db.transactions.filter((tx) => !(tx.customerId === customerId && tx.businessId === businessId));
    this.saveDB(db);
  }

  addPointsToCustomer(businessId: string, customerId: string, amount: number, description?: string) {
    const db = this.loadDB();
    const cardIdx = db.loyaltyCards.findIndex((lc) => lc.customerId === customerId && lc.businessId === businessId);
    if (cardIdx === -1) throw new Error('Tarjeta no encontrada');

    db.loyaltyCards[cardIdx].points += amount;
    db.loyaltyCards[cardIdx].visits += 1;
    db.loyaltyCards[cardIdx].updatedAt = new Date().toISOString();

    const transaction: Transaction = {
      id: 'tx-' + Date.now(),
      businessId,
      customerId,
      type: 'earn_points',
      points: amount,
      description: description || `Puntos otorgados (+${amount})`,
      createdAt: new Date().toISOString(),
    };

    db.transactions.push(transaction);
    this.saveDB(db);
  }

  // Loyalty Program
  getLoyaltyProgram(businessId: string): LoyaltyProgram | null {
    const db = this.loadDB();
    return db.loyaltyPrograms.find((lp) => lp.businessId === businessId) || null;
  }

  updateLoyaltyProgram(businessId: string, updates: Partial<LoyaltyProgram>): LoyaltyProgram {
    const db = this.loadDB();
    let idx = db.loyaltyPrograms.findIndex((lp) => lp.businessId === businessId);
    if (idx === -1) {
      const newProgram: LoyaltyProgram = {
        id: 'lp-' + Date.now(),
        businessId,
        name: updates.name || 'Programa de Fidelización',
        type: updates.type || 'stamps',
        pointsRequired: updates.pointsRequired || 10,
        conditions: updates.conditions || '',
        active: updates.active !== undefined ? updates.active : true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      db.loyaltyPrograms.push(newProgram);
      this.saveDB(db);
      return newProgram;
    }

    db.loyaltyPrograms[idx] = {
      ...db.loyaltyPrograms[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    this.saveDB(db);
    return db.loyaltyPrograms[idx];
  }

  // Rewards
  getRewards(businessId: string): Reward[] {
    const db = this.loadDB();
    return db.rewards.filter((r) => r.businessId === businessId);
  }

  addReward(businessId: string, input: Omit<Reward, 'id' | 'businessId' | 'createdAt' | 'updatedAt'>): Reward {
    const db = this.loadDB();
    const reward: Reward = {
      id: 'rew-' + Date.now(),
      businessId,
      ...input,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.rewards.push(reward);
    this.saveDB(db);
    return reward;
  }

  updateReward(businessId: string, rewardId: string, updates: Partial<Reward>): Reward {
    const db = this.loadDB();
    const idx = db.rewards.findIndex((r) => r.id === rewardId && r.businessId === businessId);
    if (idx === -1) throw new Error('Recompensa no encontrada');

    db.rewards[idx] = {
      ...db.rewards[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    this.saveDB(db);
    return db.rewards[idx];
  }

  deleteReward(businessId: string, rewardId: string) {
    const db = this.loadDB();
    db.rewards = db.rewards.filter((r) => !(r.id === rewardId && r.businessId === businessId));
    this.saveDB(db);
  }

  redeemReward(businessId: string, customerId: string, rewardId: string) {
    const db = this.loadDB();
    const reward = db.rewards.find((r) => r.id === rewardId && r.businessId === businessId);
    if (!reward) throw new Error('Recompensa no encontrada');

    const cardIdx = db.loyaltyCards.findIndex((lc) => lc.customerId === customerId && lc.businessId === businessId);
    if (cardIdx === -1) throw new Error('Tarjeta de cliente no encontrada');

    if (db.loyaltyCards[cardIdx].points < reward.requiredPoints) {
      throw new Error('Puntos insuficientes para canjear esta recompensa');
    }

    db.loyaltyCards[cardIdx].points -= reward.requiredPoints;
    db.loyaltyCards[cardIdx].updatedAt = new Date().toISOString();

    const transaction: Transaction = {
      id: 'tx-' + Date.now(),
      businessId,
      customerId,
      type: 'redeem_reward',
      points: -reward.requiredPoints,
      description: `Canje de recompensa: ${reward.name}`,
      createdAt: new Date().toISOString(),
    };

    db.transactions.push(transaction);
    this.saveDB(db);
  }

  // Transactions & Metrics
  getTransactions(businessId: string): (Transaction & { customerName: string })[] {
    const db = this.loadDB();
    const bizTx = db.transactions.filter((t) => t.businessId === businessId);

    return bizTx
      .map((t) => {
        const customer = db.customers.find((c) => c.id === t.customerId);
        return {
          ...t,
          customerName: customer ? customer.name : 'Cliente Registrado',
        };
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  getCustomerPortalData(businessSlug: string, phoneOrEmail?: string) {
    const db = this.loadDB();
    const business = db.businesses.find((b) => b.slug === businessSlug);
    if (!business) return null;

    const program = db.loyaltyPrograms.find((lp) => lp.businessId === business.id);
    const rewards = db.rewards.filter((r) => r.businessId === business.id && r.active);

    let customer: Customer | null = null;
    let card: LoyaltyCard | null = null;
    let transactions: Transaction[] = [];

    if (phoneOrEmail) {
      customer =
        db.customers.find(
          (c) =>
            c.businessId === business.id &&
            (c.phone === phoneOrEmail || (c.email && c.email.toLowerCase() === phoneOrEmail.toLowerCase()))
        ) || null;

      if (customer) {
        card = db.loyaltyCards.find((lc) => lc.businessId === business.id && lc.customerId === customer?.id) || null;
        transactions = db.transactions.filter((t) => t.businessId === business.id && t.customerId === customer?.id);
      }
    }

    return {
      business,
      program,
      rewards,
      customer,
      card,
      transactions,
    };
  }

  switchBusinessSession(businessId: string) {
    const db = this.loadDB();
    const business = db.businesses.find((b) => b.id === businessId);
    if (!business) throw new Error('Business not found');

    db.currentSession = {
      userId: business.ownerId,
      businessId: business.id,
    };
    this.saveDB(db);
  }
}

export const mockDb = new MockDatabase();
