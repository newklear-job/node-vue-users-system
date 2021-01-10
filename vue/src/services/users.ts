export class UserData implements UserDataI {
  email: string;
  first_name: string;
  last_name: string;
  gender: string;
  password: string;
  password_confirmation: string;

  constructor() {
    this.setDefaultValues();
  }

  private setDefaultValues() {
    this.email = "";
    this.first_name = "";
    this.last_name = "";
    this.gender = "";
    this.password = "";
    this.password_confirmation = "";
  }
  clear() {
    this.setDefaultValues();
  }
}

interface UserDataI {
  email: string;
  first_name: string;
  last_name: string;
  gender?: string;
  password?: string;
  password_confirmation?: string;
}
