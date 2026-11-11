export type { AuthStackParamList } from '../navigation/types';

export interface AuthButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}