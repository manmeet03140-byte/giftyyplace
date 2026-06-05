// ============================================================
// GiftyyPlace — Database TypeScript Types
// ============================================================
// These types mirror the PostgreSQL schema for type-safe queries.

export type OrderType = "premade" | "custom" | "bulk";
export type OrderStatus = "pending" | "processing" | "shipped" | "delivered";
export type ItemCategory =
  | "base"
  | "food"
  | "keepsake"
  | "accessory"
  | "personalization";
export type BulkStatus =
  | "new"
  | "contacted"
  | "quoted"
  | "confirmed"
  | "fulfilled"
  | "cancelled";

// ── Pre-Made Hampers ────────────────────────────────────────

export interface PremadeHamper {
  id: string;
  name: string;
  description: string | null;
  price: number;
  inventory_count: number;
  images: string[];
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type PremadeHamperInsert = Omit<
  PremadeHamper,
  "id" | "created_at" | "updated_at" | "is_featured" | "is_active"
> &
  Partial<Pick<PremadeHamper, "is_featured" | "is_active">>;

// ── Custom Hamper Items ─────────────────────────────────────

export interface CustomHamperItem {
  id: string;
  category: ItemCategory;
  name: string;
  description: string | null;
  price: number;
  inventory_count: number;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type CustomHamperItemInsert = Omit<
  CustomHamperItem,
  "id" | "created_at" | "updated_at" | "is_active"
> &
  Partial<Pick<CustomHamperItem, "is_active">>;

// ── Orders ──────────────────────────────────────────────────

export interface OrderItem {
  item_id: string;
  name: string;
  price: number;
  quantity: number;
  type: "premade" | "custom_item";
  image_url?: string;
}

export interface ShippingAddress {
  full_name: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  postal_code: string;
  phone: string;
}

export interface Order {
  id: string;
  user_email: string;
  total_price: number;
  order_type: OrderType;
  status: OrderStatus;
  items_json: OrderItem[];
  shipping_address: ShippingAddress | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export type OrderInsert = Omit<
  Order,
  "id" | "created_at" | "updated_at" | "status"
> &
  Partial<Pick<Order, "status">>;

// ── Bulk Requests ───────────────────────────────────────────

export interface BulkRequest {
  id: string;
  company_name: string;
  contact_name: string | null;
  contact_email: string;
  contact_phone: string | null;
  order_size: number;
  budget_per_hamper: number | null;
  total_budget: number | null;
  timeline: string | null;
  requirements_text: string | null;
  file_attachment_url: string | null;
  status: BulkStatus;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

export type BulkRequestInsert = Omit<
  BulkRequest,
  "id" | "created_at" | "updated_at" | "status"
> &
  Partial<Pick<BulkRequest, "status">>;

// ── Supabase Database Type Map ──────────────────────────────

export interface Database {
  public: {
    Tables: {
      premade_hampers: {
        Row: PremadeHamper;
        Insert: PremadeHamperInsert;
        Update: Partial<PremadeHamperInsert>;
      };
      custom_hamper_items: {
        Row: CustomHamperItem;
        Insert: CustomHamperItemInsert;
        Update: Partial<CustomHamperItemInsert>;
      };
      orders: {
        Row: Order;
        Insert: OrderInsert;
        Update: Partial<OrderInsert>;
      };
      bulk_requests: {
        Row: BulkRequest;
        Insert: BulkRequestInsert;
        Update: Partial<BulkRequestInsert>;
      };
    };
    Enums: {
      order_type_enum: OrderType;
      order_status_enum: OrderStatus;
      item_category_enum: ItemCategory;
      bulk_status_enum: BulkStatus;
    };
  };
}
