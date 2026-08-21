export type UserRole = "customer" | "admin";
export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "EXPIRED";
export type FulfillmentStatus =
  | "PENDING"
  | "PROCESSING"
  | "SUCCESS"
  | "FAILED";

export interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  sku: string;
  supplier_sku: string | null;
  description: string | null;
  price: number;
  image_url: string | null;
  is_active: boolean;
  is_popular: boolean;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  order_number: string;
  total_amount: number;
  payment_status: PaymentStatus;
  fulfillment_status: FulfillmentStatus;
  payment_method: string | null;
  midtrans_transaction_id: string | null;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  target_data: Record<string, unknown>;
  supplier_order_id: string | null;
  supplier_status: string | null;
  supplier_response: Record<string, unknown> | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface Payment {
  id: string;
  order_id: string;
  provider: string;
  provider_transaction_id: string | null;
  amount: number;
  status: string;
  payment_type: string | null;
  raw_notification: Record<string, unknown> | null;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
}
