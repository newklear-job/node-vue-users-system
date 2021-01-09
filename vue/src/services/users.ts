export function clearUserData(userData: UserData) {
  userData.email = "";
  userData.first_name = "";
  userData.last_name = "";
  userData.gender = "";
  userData.password = "";
  userData.password_confirmation = "";
}

interface UserData {
  email: string;
  first_name: string;
  last_name: string;
  gender?: string;
  password?: string;
  password_confirmation?: string;
}
