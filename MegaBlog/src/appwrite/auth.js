import conf from "../conf/conf";

import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  //sign up
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        //if account created then login directly
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      //   throw error;
      console.log("Error in createAccount :: ", error);
    }
  }

  //login/sign in
  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      //   throw error;
      console.log("Error in login :: ", error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Error in getCurrentUser :: ", error);
    }
    return null;
  }

  //log out
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Error in logout :: ", error);
    }
  }
}

const authService = new AuthService();
export default authService;
