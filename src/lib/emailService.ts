
import { z } from 'zod';

const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export type EmailData = z.infer<typeof emailSchema>;

export const validateEmail = (email: string): { isValid: boolean; error?: string } => {
  try {
    emailSchema.parse({ email });
    return { isValid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.errors[0].message };
    }
    return { isValid: false, error: 'Invalid email format' };
  }
};

export const submitEmail = async (email: string): Promise<{ success: boolean; message: string }> => {
  // Validate email first
  const validation = validateEmail(email);
  if (!validation.isValid) {
    return { success: false, message: validation.error || 'Invalid email' };
  }

  try {
    // Create mailto link to send email to info@agritourismadventures.com
    const subject = 'New Newsletter Subscription';
    const body = `New subscription request from: ${email}

This user has signed up for the AgriTourism Adventures newsletter and should receive a 10% discount on their first tour.

Email: ${email}
Timestamp: ${new Date().toISOString()}
Source: Homepage popup`;

    const mailtoLink = `mailto:info@agritourismadventures.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open mailto link
    window.location.href = mailtoLink;
    
    return { success: true, message: 'Thank you for subscribing! Check your email for your 10% discount code.' };
  } catch (error) {
    console.error('Email submission error:', error);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
};
