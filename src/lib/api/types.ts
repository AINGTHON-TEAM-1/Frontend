export type UUID = string;
export type ISODateTime = string;

export type Role = "giver" | "taker";

export type Category =
  | "network"
  | "league"
  | "community"
  | "crew"
  | "circle"
  | "party";

export type Format = "freechat" | "coffeechat" | "mealchat";

export type MatchStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "paid"
  | "completed"
  | "cancelled";

export type InitiatedBy = "taker" | "giver";

export type RejectReason = "time_mismatch" | "field_mismatch" | "other";

export type TakerPostStatus = "open" | "matched" | "closed";

export type CommunityCategory = "giver" | "taker" | "both";

export interface UserResponse {
  id: UUID;
  nickname: string;
  profile_image_url: string | null;
  email: string | null;
  role: Role;
  created_at: ISODateTime;
  updated_at: ISODateTime;
}

export interface GiverProfileResponse {
  id: UUID;
  user_id: UUID;
  bio_short: string | null;
  bio_long: string | null;
  freechat_enabled: boolean;
  coffeechat_enabled: boolean;
  mealchat_enabled: boolean;
  coffeechat_price: number;
  mealchat_price: number;
  pricing_score: string;
  pricing_updated_at: ISODateTime;
  rating_avg: string;
  rating_count: number;
  match_count: number;
  is_newbie: boolean;
  created_at: ISODateTime;
}

export interface GiverProfileCreateRequest {
  bio_short?: string | null;
  bio_long?: string | null;
  freechat_enabled?: boolean;
  coffeechat_enabled?: boolean;
  mealchat_enabled?: boolean;
}

export type GiverProfileUpdateRequest = Partial<GiverProfileCreateRequest>;

export interface GiverExperienceResponse {
  id: UUID;
  giver_profile_id: UUID;
  community_name: string | null;
  categories: Category[];
  duration_months: number | null;
  max_member_count: number | null;
  proof_url: string | null;
  achievement: string | null;
  created_at: ISODateTime;
}

export interface GiverExperienceCreateRequest {
  community_name?: string | null;
  categories: Category[];
  duration_months?: number | null;
  max_member_count?: number | null;
  proof_url?: string | null;
  achievement?: string | null;
}

export interface TakerPostResponse {
  id: UUID;
  user_id: UUID;
  title: string;
  body: string;
  category: Category | null;
  preferred_format: Format | null;
  budget_min: number | null;
  budget_max: number | null;
  status: TakerPostStatus;
  application_count: number;
  created_at: ISODateTime;
}

export interface TakerPostCreateRequest {
  title: string;
  body: string;
  category?: Category | null;
  preferred_format?: Format | null;
  budget_min?: number | null;
  budget_max?: number | null;
}

export interface TakerPostUpdateRequest {
  title?: string;
  body?: string;
  category?: Category | null;
  preferred_format?: Format | null;
  budget_min?: number | null;
  budget_max?: number | null;
  status?: TakerPostStatus;
}

export interface DiscoverGiverItem {
  id: UUID;
  nickname: string;
  profile_image_url: string | null;
  bio_short: string | null;
  rating_avg: string;
  rating_count: number;
  match_count: number;
  tags: string[];
  categories: Category[];
  freechat_enabled: boolean;
  coffeechat_price: number;
  mealchat_price: number;
}

export interface DiscoverGiversResponse {
  total: number;
  page: number;
  items: DiscoverGiverItem[];
}

export interface DiscoverPostItem {
  id: UUID;
  title: string;
  body_preview: string;
  category: Category | null;
  preferred_format: Format | null;
  budget_min: number | null;
  budget_max: number | null;
  tags: string[];
  application_count: number;
  status: TakerPostStatus;
  author_nickname: string;
  created_at: ISODateTime;
}

export interface DiscoverPostsResponse {
  total: number;
  page: number;
  items: DiscoverPostItem[];
}

export interface PopularTagItem {
  tag: string;
  count: number;
}

export interface PopularTagsResponse {
  tags: PopularTagItem[];
}

export interface TagSuggestRequest {
  text: string;
}

export interface TagSuggestResponse {
  success: boolean;
  suggested_tags: string[];
  processing_time_ms: number;
  note: string;
}

export interface MatchResponse {
  id: UUID;
  taker_id: UUID;
  giver_id: UUID;
  taker_post_id: UUID | null;
  initiated_by: InitiatedBy;
  format: Format;
  message: string;
  preferred_dates: unknown;
  status: MatchStatus;
  payment_amount: number;
  payment_id: string | null;
  created_at: ISODateTime;
  accepted_at: ISODateTime | null;
  paid_at: ISODateTime | null;
}

export interface MatchCreateRequest {
  target_type: "giver" | "taker_post";
  target_id: UUID;
  post_id?: UUID | null;
  format: Format;
  message: string;
  preferred_dates?: unknown;
}

export interface MatchRejectRequest {
  reason: RejectReason;
}

export interface CommunityPostResponse {
  id: UUID;
  user_id: UUID;
  title: string;
  body: string;
  category: CommunityCategory;
  created_at: ISODateTime;
  updated_at: ISODateTime;
  author_nickname: string;
}

export interface CommunityPostCreateRequest {
  title: string;
  body: string;
  category: CommunityCategory;
}

export interface PaginatedResponse<T> {
  total: number;
  page: number;
  items: T[];
}

export type DiscoverGiversSort = "latest" | "rating" | "popular" | "price_asc";
export type DiscoverPostsSort = "latest" | "applications_asc" | "budget_desc";
