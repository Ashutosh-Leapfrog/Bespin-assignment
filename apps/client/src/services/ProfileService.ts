import { IUser } from "~/interfaces/IUser";

export default class ProfileService {
  static async getProfile() {
    try {
      const profile = localStorage.getItem("profile");
      if (!profile) {
        return null;
      }
      const user: IUser = JSON.parse(profile);
      return user;
    } catch (error) {
      return null;
    }
  }

  static async removeProfile() {
    localStorage.removeItem("profile");
  }

  static async getUserId() {
    const user = await this.getProfile();
    return user?.id ?? null;
  }

  static async getUserImage() {
    const user = await this.getProfile();
    return user?.imageUrl ?? null;
  }

  static async setProfile(user: IUser) {
    localStorage.setItem("profile", JSON.stringify(user));
  }
}
