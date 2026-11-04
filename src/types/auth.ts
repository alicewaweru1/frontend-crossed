export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export interface AuthButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}