export interface IGroup {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
  users: IUserWithoutPassword[]
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  USER_PREMIUM = 'USER_PREMIUM',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export interface IComment {
  id: string
  content: string
  createdAt: Date
  updatedAt: Date
  author: IUserWithoutPassword
  file: IFile
  sharedUrl: ISharedUrl
  commentInteractions: IInteractionWithComment[]
}

export enum Reaction {
  LIKE = 'LIKE',
  DISLIKE = 'DISLIKE',
  LOVE = 'LOVE',
  HAHA = 'HAHA',
}

export interface ISharedUrl {
  id: string
  title: string
  endAt: Date
  createdAt: Date
  updatedAt: Date
  users: IUserWithoutPassword[]
  comments: IComment[]
  files: IFile[]
}

export interface IInteractionWithComment {
  id: string
  author: IUserWithoutPassword
  comment: IComment
  reaction: Reaction
  createdAt: Date
  updatedAt: Date
}

export interface IInteractionWithFile {
  id: string
  author: IUserWithoutPassword
  file: IFile
  reaction: Reaction
  createdAt: Date
  updatedAt: Date
}

export interface IFile {
  id: string
  title: string
  description: string
  format: string
  duration: string
  isPublic: boolean
  url: string
  createdAt: Date
  updatedAt: Date
  author: IUserWithoutPassword
  comments: IComment[]
  sharedUrls: ISharedUrl[]
  fileInteractions: IInteractionWithFile[]
}

export interface IUserWithoutPassword {
  id: string
  username: string
  email: string
  imgUrl?: string
  createdAt: Date
  updatedAt: Date
  role: Role
  groups: IGroup[]
  files: IFile[]
  comments: IComment[]
  sharedUrls: ISharedUrl[]
  fileInteractions: IInteractionWithFile[]
  commentInteractions: IInteractionWithComment[]
}

export interface LoginInfos {
  email: string
  password: string
}

export interface Message {
  message: string
  type: 'success' | 'error'
}

export interface LoginResponse {
  user: Partial<IUserWithoutPassword> | null
  token: string
}

export interface IUserContext {
  user: Partial<IUserWithoutPassword & Message> | null;
  token: string | null;
  signIn: ({ email, password }: LoginInfos) => Promise<void>;
  signOut: () => Promise<void>;
}

export interface IRegisterInfos {
  email: string
  username: string
  password: string
  imgUrl?: string
}
