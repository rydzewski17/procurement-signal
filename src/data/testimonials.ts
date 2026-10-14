import raw from './testimonials.json';
export interface Testimonial { quote: string; name: string; role: string; company: string; permissionDate: string }
export const testimonials = (raw.items ?? []) as Testimonial[];
