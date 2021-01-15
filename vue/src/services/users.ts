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

  setValues(values: Values) {
    this.email = values.email;
    this.first_name = values.first_name;
    this.last_name = values.last_name;
    this.gender = values.gender;
    this.password = values.password;
    this.password_confirmation = values.password_confirmation;
  }
}

interface Values {
  [key: string]: string;
}

export interface UserDataI {
  email: string;
  first_name: string;
  last_name: string;
  gender?: string;
  password?: string;
  password_confirmation?: string;
  clear(): void;
  setValues(values: Values): void;
}
