import { Account, Avatars, Client, Databases, OAuthProvider, Query } from "react-native-appwrite";
import * as linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";

export const config = {
    platform: 'com.aidly',
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT ,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
};

export const client = new Client();

client
    .setEndpoint(config.endpoint!)
    .setProject(config.projectId!)
    .setPlatform(config.platform!)


export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);


export async function signUp(email: string, password: string, name: string) {
    try {
        // Create an account with the provided email, password, and name
        const response = await account.create(email, password, name);

        if (!response) throw new Error("Sign up failed");

        console.log("\u2705 Account created successfully:", response);
        return true;
    } catch (e) {
        console.error("\ud83d\udea8 Sign Up Error:", e);
        return false;
    }
}


export async function login() {
    try {
      const redirectUri = linking.createURL("/");
      const response = await account.createOAuth2Token(
        OAuthProvider.Google,
        redirectUri
      );
      if (!response) throw new Error("Create OAuth2 token failed");
      const browserResult = await openAuthSessionAsync(
        response.toString(),
        redirectUri
      );
      if (browserResult.type !== "success")
        throw new Error("Create OAuth2 token failed");
      const url = new URL(browserResult.url);
      const secret = url.searchParams.get("secret")?.toString();
      const userId = url.searchParams.get("userId")?.toString();
      if (!secret || !userId) throw new Error("Create OAuth2 token failed");
      const session = await account.createSession(userId, secret);
      if (!session) throw new Error("Failed to create session");
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

export async function logout() {
    try {
        await account.deleteSession("current");
        console.log("\u2705 Logged out successfully");
        return true;
    } catch (e) {
        console.error("\ud83d\udea8 Logout Error:", e);
        return false;
    }
}

export async function getCurrentUser() {
    try {
        const response = await account.get();
        if (response.$id) {
            const userAvatar = avatar.getInitials(response.name);
            console.log("\u2705 User Fetched:", response);
            return {
                ...response,
                avatar: userAvatar.toString(),
            };
        }
    } catch (e) {
        console.error("\ud83d\udea8 Fetch User Error:", e);
        return null;
    }
}