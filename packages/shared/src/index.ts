export type UserRole = 'buyer' | 'seller' | 'admin';

export type ListingStatus =
  | 'draft'
  | 'pending_approval'
  | 'active'
  | 'completed'
  | 'cancelled'
  | 'rejected';

export type AuctionStatus = 'active' | 'completed' | 'cancelled';

export type PaymentStatus = 'pending' | 'paid' | 'refunded' | 'failed';

export type PaymentGateway = 'esewa' | 'khalti' | 'connectips' | 'stripe';

export type KycStatus =
  | 'not_submitted'
  | 'pending_kyc'
  | 'kyc_approved'
  | 'kyc_rejected';

export type DisputeStatus = 'open' | 'resolved' | 'closed';

export type DisputeOutcome =
  | 'keep_with_seller'
  | 'refund_buyer'
  | 'issue_warning';
