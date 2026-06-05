"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
} from "react";

// ── Types ───────────────────────────────────────────────────

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  type: "premade" | "custom_item";
}

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity"> & { quantity?: number } }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_DRAWER"; payload?: boolean }
  | { type: "HYDRATE"; payload: CartItem[] };

interface CartContextValue {
  items: CartItem[];
  isDrawerOpen: boolean;
  totalItems: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleDrawer: (open?: boolean) => void;
  isInCart: (id: string) => boolean;
  getItemQuantity: (id: string) => number;
}

// ── Reducer ─────────────────────────────────────────────────

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingIndex > -1) {
        const updated = [...state.items];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity:
            updated[existingIndex].quantity + (action.payload.quantity || 1),
        };
        return { ...state, items: updated };
      }
      return {
        ...state,
        items: [
          ...state.items,
          { ...action.payload, quantity: action.payload.quantity || 1 },
        ],
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case "UPDATE_QUANTITY": {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (item) => item.id !== action.payload.id
          ),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "TOGGLE_DRAWER":
      return {
        ...state,
        isDrawerOpen:
          action.payload !== undefined ? action.payload : !state.isDrawerOpen,
      };
    case "HYDRATE":
      return { ...state, items: action.payload };
    default:
      return state;
  }
}

// ── Context ─────────────────────────────────────────────────

const CartContext = createContext<CartContextValue | null>(null);

const CART_STORAGE_KEY = "giftyyplace-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isDrawerOpen: false,
  });

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          dispatch({ type: "HYDRATE", payload: parsed });
        }
      }
    } catch {
      // Silently fail if localStorage is unavailable
    }
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // Silently fail
    }
  }, [state.items]);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
      dispatch({ type: "ADD_ITEM", payload: item });
    },
    []
  );

  const removeItem = useCallback((id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const toggleDrawer = useCallback((open?: boolean) => {
    dispatch({ type: "TOGGLE_DRAWER", payload: open });
  }, []);

  const isInCart = useCallback(
    (id: string) => state.items.some((item) => item.id === id),
    [state.items]
  );

  const getItemQuantity = useCallback(
    (id: string) => state.items.find((item) => item.id === id)?.quantity || 0,
    [state.items]
  );

  const totalItems = useMemo(
    () => state.items.reduce((sum, item) => sum + item.quantity, 0),
    [state.items]
  );

  const totalPrice = useMemo(
    () =>
      state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
    [state.items]
  );

  const value = useMemo(
    () => ({
      items: state.items,
      isDrawerOpen: state.isDrawerOpen,
      totalItems,
      totalPrice,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      toggleDrawer,
      isInCart,
      getItemQuantity,
    }),
    [
      state.items,
      state.isDrawerOpen,
      totalItems,
      totalPrice,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      toggleDrawer,
      isInCart,
      getItemQuantity,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
