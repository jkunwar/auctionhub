export type RoleName = 'buyer' | 'seller' | 'staff' | 'admin'

export type ListingStatus = 'draft' | 'active' | 'completed' | 'cancelled'

export type AuctionStatus = 'active' | 'completed' | 'cancelled'

export type BidType = 'manual' | 'proxy'

export type OrderStatus =
  | 'pending_pickup'
  | 'scheduled'
  | 'completed'
  | 'no_show'
  | 'cancelled'

export type KycStatus = 'not_submitted' | 'pending' | 'approved' | 'rejected'

export type NotificationType =
  | 'outbid'
  | 'auction_ending_24h'
  | 'auction_ending_1h'
  | 'auction_won'
  | 'auction_closed_no_winner'
  | 'pickup_reminder'
  | 'order_completed'
  | 'auction_extended'
  | 'listing_published'
