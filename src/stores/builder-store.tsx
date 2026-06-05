"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { CustomHamperItem } from "@/types/database";

// ── State Definition ──────────────────────────────────────────────

export type BuilderStep = 1 | 2 | 3 | 4;

export interface BuilderSelectedItem {
  item: CustomHamperItem;
  quantity: number;
}

export interface BuilderState {
  currentStep: BuilderStep;
  selectedBase: CustomHamperItem | null;
  selectedItems: BuilderSelectedItem[];
  selectedFinishing: BuilderSelectedItem[];
  giftMessage: string;
}

const initialState: BuilderState = {
  currentStep: 1,
  selectedBase: null,
  selectedItems: [],
  selectedFinishing: [],
  giftMessage: "",
};

// ── Actions ───────────────────────────────────────────────────────

export type BuilderAction =
  | { type: "SET_STEP"; payload: BuilderStep }
  | { type: "SET_BASE"; payload: CustomHamperItem }
  | { type: "ADD_ITEM"; payload: CustomHamperItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_ITEM_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "TOGGLE_FINISHING"; payload: CustomHamperItem }
  | { type: "SET_GIFT_MESSAGE"; payload: string }
  | { type: "RESET" };

function builderReducer(state: BuilderState, action: BuilderAction): BuilderState {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, currentStep: action.payload };
    case "SET_BASE":
      return { ...state, selectedBase: action.payload, currentStep: 2 };
    case "ADD_ITEM": {
      const existing = state.selectedItems.find((i) => i.item.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          selectedItems: state.selectedItems.map((i) =>
            i.item.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { ...state, selectedItems: [...state.selectedItems, { item: action.payload, quantity: 1 }] };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        selectedItems: state.selectedItems.filter((i) => i.item.id !== action.payload),
      };
    case "UPDATE_ITEM_QUANTITY":
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          selectedItems: state.selectedItems.filter((i) => i.item.id !== action.payload.id),
        };
      }
      return {
        ...state,
        selectedItems: state.selectedItems.map((i) =>
          i.item.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i
        ),
      };
    case "TOGGLE_FINISHING": {
      const existing = state.selectedFinishing.find((i) => i.item.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          selectedFinishing: state.selectedFinishing.filter((i) => i.item.id !== action.payload.id),
        };
      }
      return {
        ...state,
        selectedFinishing: [...state.selectedFinishing, { item: action.payload, quantity: 1 }],
      };
    }
    case "SET_GIFT_MESSAGE":
      return { ...state, giftMessage: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

// ── Context ───────────────────────────────────────────────────────

interface BuilderContextType {
  state: BuilderState;
  dispatch: React.Dispatch<BuilderAction>;
  totalPrice: number;
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export function BuilderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(builderReducer, initialState);

  // Derived state
  const basePrice = state.selectedBase?.price || 0;
  const itemsPrice = state.selectedItems.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
  const finishingPrice = state.selectedFinishing.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
  const totalPrice = basePrice + itemsPrice + finishingPrice;

  return (
    <BuilderContext.Provider value={{ state, dispatch, totalPrice }}>
      {children}
    </BuilderContext.Provider>
  );
}

export function useBuilder() {
  const context = useContext(BuilderContext);
  if (context === undefined) {
    throw new Error("useBuilder must be used within a BuilderProvider");
  }
  return context;
}
