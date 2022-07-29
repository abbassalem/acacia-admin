import { User } from 'src/app/auth/models/user';
import { OrderItem } from './OrderItem.model';

export interface Order {
   id?: string;
   orderDate: number;
   deliveryDate: number;
   deliveryTime: string;
   deliveryAddress?: string;
   status: OrderStatus
   items: Array<OrderItem>;
   userId: string;
   orderUser?: User;
   paid?: boolean;
   amount: number;
}

export enum OrderStatus {
    ALL = 'ALL',
    OPEN = 'OPEN',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED',
    CLOSED = 'CLOSED',
    ARCHIVED = 'ARCHIVED'
}


export interface OrderSearchCriteria {
    start?: number;
    end?: number;
    status?: string;
    userId?: string;
  }