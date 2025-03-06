import { useState } from 'react';
import { signIn } from 'next-auth/react';
import axios from '@/lib/axios';
import { isAxiosError } from 'axios';

interface UseAuthReturn {
  phoneNumber: string;
  otp: string;
  isOtpSent: boolean;
  isLoading: boolean;
  error: string | null;
  countryCode: string;
  setCountryCode: (code: string) => void;
  setPhoneNumber: (number: string) => void;
  setOtp: (otp: string) => void;
  handleSendOtp: () => Promise<void>;
  handleVerifyOtp: () => Promise<void>;
}

interface InitLoginResponse {
  status: boolean;
  message: string;
  data: {
    phoneNumber: string;
    isNewUser: boolean;
  };
}

export const useAuth = (): UseAuthReturn => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countryCode, setCountryCode] = useState("+91");

  const handleSendOtp = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!phoneNumber) {
        setError('Phone number is required');
        return;
      }

      const formattedPhoneNumber = phoneNumber.startsWith('+') 
        ? phoneNumber 
        : `${countryCode}${phoneNumber}`;

      const { data } = await axios.post<InitLoginResponse>('/user/init-login', {
        phoneNumber: formattedPhoneNumber,
      });

      if (!data.status) {
        setError(data.message || 'Failed to send OTP');
        return;
      }

      setIsOtpSent(true);
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.response?.data?.message || 'Failed to send OTP');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!otp) {
        setError('OTP is required');
        return;
      }

      const formattedPhoneNumber = phoneNumber.startsWith('+') 
        ? phoneNumber 
        : `${countryCode}${phoneNumber}`;

      const result = await signIn('credentials', {
        phoneNumber: formattedPhoneNumber,
        otp,
        deviceId: 'web-default',
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        return;
      }

      window.location.href = '/'; 
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.response?.data?.message || 'Failed to verify OTP');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    phoneNumber,
    otp,
    isOtpSent,
    isLoading,
    error,
    countryCode,
    setPhoneNumber,
    setOtp,
    handleSendOtp,
    handleVerifyOtp,
    setCountryCode,
  };
}; 