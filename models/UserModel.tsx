export default interface UserModel {
  name: string;
  email: string;
  githubUser: string;
  avatar: File | null;
}
