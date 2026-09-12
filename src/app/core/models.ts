export interface Category {
  id: string;
  name: string;
  tagline: string;
  image: string;
}

export interface Ingredient {
  name: string;
  qty: string;
}

export interface Recipe {
  id: string;
  categoryId: string;
  name: string;
  shortDesc: string;
  image: string;
  difficulty: 'Very Low' | 'Low' | 'Medium' | 'Hard' | 'Very Hard';
  time: string;
  doses: string;
  cost: 'Low' | 'Medium' | 'High' | 'Very High';
  ingredients: Ingredient[];
  instructions: string;
}

export interface ShoppingItem {
  id: string;
  name: string;
  qty: string;
  checked: boolean;
}

export interface AppUser {
  name: string;
  surname: string;
  email: string;
}
