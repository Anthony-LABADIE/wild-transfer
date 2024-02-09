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

export type InteractionResponse = {
  id: string
  author: { username: string }
  emoji: Mood
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

export interface LoginResponse {
  user: IUserWithoutPassword
  token: string
}

export interface IUserContext {
  user: Partial<IUserWithoutPassword> | null
  token: string | null
  signIn: ({ email, password }: LoginInfos) => Promise<void>
  signOut: () => Promise<void>
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export type AuthState = {
  user: IUserWithoutPassword | null
  isAuth: boolean
}

export type Comment = {
  id: string
  content: string
  author: {
    id: string
    username: string
  }
  file: {
    id: string
  }
  sharedUrl: {
    id: string
  }
  createdAt: string
}

export interface Mood {
  id: string
  name: string
  iconName: string
  value: string | null
  icon: string
  iconColor: string
  bgColor: string
}

export interface Interaction {
  id: string
  author: {
    id: string
    userName: string
  }
  comment: {
    id: string
  }
  emoji: {
    bgColor: string
    iconColor: string
    iconName: string
  }
}
