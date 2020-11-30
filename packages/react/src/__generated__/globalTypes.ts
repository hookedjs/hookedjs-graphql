/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum PostStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

export enum UserRole {
  ADMIN = "ADMIN",
  AUTHOR = "AUTHOR",
  EDITOR = "EDITOR",
}

export interface ApiAccessCreateManyWithoutReqUserInput {
  connect?: ApiAccessWhereUniqueInput[] | null;
  create?: ApiAccessCreateWithoutReqUserInput[] | null;
}

export interface ApiAccessCreateWithoutReqUserInput {
  createdAt?: any | null;
  duration: number;
  id?: string | null;
  ip: string;
  operationName: string;
}

export interface ApiAccessWhereUniqueInput {
  id?: string | null;
}

export interface ApiErrorCreateManyWithoutReqUserInput {
  connect?: ApiErrorWhereUniqueInput[] | null;
  create?: ApiErrorCreateWithoutReqUserInput[] | null;
}

export interface ApiErrorCreateWithoutReqUserInput {
  createdAt?: any | null;
  id?: string | null;
  ip: string;
  message: string;
  operationName: string;
  reqBody: any;
  resBody: any;
  stack: any;
}

export interface ApiErrorWhereUniqueInput {
  id?: string | null;
}

export interface AuthInputType {
  email: string;
  password: string;
}

export interface AuthRefreshInputType {
  refreshToken: string;
}

export interface ClientEventCreateManyWithoutReqUserInput {
  connect?: ClientEventWhereUniqueInput[] | null;
  create?: ClientEventCreateWithoutReqUserInput[] | null;
}

export interface ClientEventCreateWithoutReqUserInput {
  context?: any | null;
  createdAt?: any | null;
  id?: string | null;
  ip: string;
  name: string;
  userAgent: string;
}

export interface ClientEventWhereUniqueInput {
  id?: string | null;
}

export interface PostCreateManyWithoutAuthorInput {
  connect?: PostWhereUniqueInput[] | null;
  create?: PostCreateWithoutAuthorInput[] | null;
}

export interface PostCreateManyWithoutCreatedByInput {
  connect?: PostWhereUniqueInput[] | null;
  create?: PostCreateWithoutCreatedByInput[] | null;
}

export interface PostCreateManyWithoutUpdatedByInput {
  connect?: PostWhereUniqueInput[] | null;
  create?: PostCreateWithoutUpdatedByInput[] | null;
}

export interface PostCreateWithoutAuthorInput {
  createdAt?: any | null;
  createdBy?: UserCreateOneWithoutPostsCreatedJInput | null;
  id?: string | null;
  status: PostStatus;
  tags?: TagCreateManyWithoutPostInput | null;
  title: string;
  updatedAt?: any | null;
  updatedBy?: UserCreateOneWithoutPostsUpdatedJInput | null;
}

export interface PostCreateWithoutCreatedByInput {
  author: UserCreateOneWithoutPostsAuthoredJInput;
  createdAt?: any | null;
  id?: string | null;
  status: PostStatus;
  tags?: TagCreateManyWithoutPostInput | null;
  title: string;
  updatedAt?: any | null;
  updatedBy?: UserCreateOneWithoutPostsUpdatedJInput | null;
}

export interface PostCreateWithoutUpdatedByInput {
  author: UserCreateOneWithoutPostsAuthoredJInput;
  createdAt?: any | null;
  createdBy?: UserCreateOneWithoutPostsCreatedJInput | null;
  id?: string | null;
  status: PostStatus;
  tags?: TagCreateManyWithoutPostInput | null;
  title: string;
  updatedAt?: any | null;
}

export interface PostWhereUniqueInput {
  id?: string | null;
}

export interface TagCreateManyWithoutPostInput {
  connect?: TagWhereUniqueInput[] | null;
  create?: TagCreateWithoutPostInput[] | null;
}

export interface TagCreateWithoutPostInput {
  createdAt?: any | null;
  updatedAt?: any | null;
  value: string;
}

export interface TagWhereUniqueInput {
  id?: number | null;
}

export interface UserCreateInput {
  ApiAccess?: ApiAccessCreateManyWithoutReqUserInput | null;
  ApiError?: ApiErrorCreateManyWithoutReqUserInput | null;
  ClientEvent?: ClientEventCreateManyWithoutReqUserInput | null;
  createdAt?: any | null;
  createdBy?: UserCreateOneWithoutUsersCreatedInput | null;
  email: string;
  id?: string | null;
  name: string;
  password?: string | null;
  postsAuthoredJ?: PostCreateManyWithoutAuthorInput | null;
  postsCreatedJ?: PostCreateManyWithoutCreatedByInput | null;
  postsUpdatedJ?: PostCreateManyWithoutUpdatedByInput | null;
  roles?: UserCreaterolesInput | null;
  updatedAt?: any | null;
  updatedBy?: UserCreateOneWithoutUsersUpdatedInput | null;
  usersCreated?: UserCreateManyWithoutCreatedByInput | null;
  usersUpdated?: UserCreateManyWithoutUpdatedByInput | null;
}

export interface UserCreateManyWithoutCreatedByInput {
  connect?: UserWhereUniqueInput[] | null;
  create?: UserCreateWithoutCreatedByInput[] | null;
}

export interface UserCreateManyWithoutUpdatedByInput {
  connect?: UserWhereUniqueInput[] | null;
  create?: UserCreateWithoutUpdatedByInput[] | null;
}

export interface UserCreateOneWithoutPostsAuthoredJInput {
  connect?: UserWhereUniqueInput | null;
  create?: UserCreateWithoutPostsAuthoredJInput | null;
}

export interface UserCreateOneWithoutPostsCreatedJInput {
  connect?: UserWhereUniqueInput | null;
  create?: UserCreateWithoutPostsCreatedJInput | null;
}

export interface UserCreateOneWithoutPostsUpdatedJInput {
  connect?: UserWhereUniqueInput | null;
  create?: UserCreateWithoutPostsUpdatedJInput | null;
}

export interface UserCreateOneWithoutUsersCreatedInput {
  connect?: UserWhereUniqueInput | null;
  create?: UserCreateWithoutUsersCreatedInput | null;
}

export interface UserCreateOneWithoutUsersUpdatedInput {
  connect?: UserWhereUniqueInput | null;
  create?: UserCreateWithoutUsersUpdatedInput | null;
}

export interface UserCreateWithoutCreatedByInput {
  ApiAccess?: ApiAccessCreateManyWithoutReqUserInput | null;
  ApiError?: ApiErrorCreateManyWithoutReqUserInput | null;
  ClientEvent?: ClientEventCreateManyWithoutReqUserInput | null;
  createdAt?: any | null;
  email: string;
  id?: string | null;
  name: string;
  password?: string | null;
  postsAuthoredJ?: PostCreateManyWithoutAuthorInput | null;
  postsCreatedJ?: PostCreateManyWithoutCreatedByInput | null;
  postsUpdatedJ?: PostCreateManyWithoutUpdatedByInput | null;
  roles?: UserCreaterolesInput | null;
  updatedAt?: any | null;
  updatedBy?: UserCreateOneWithoutUsersUpdatedInput | null;
  usersCreated?: UserCreateManyWithoutCreatedByInput | null;
  usersUpdated?: UserCreateManyWithoutUpdatedByInput | null;
}

export interface UserCreateWithoutPostsAuthoredJInput {
  ApiAccess?: ApiAccessCreateManyWithoutReqUserInput | null;
  ApiError?: ApiErrorCreateManyWithoutReqUserInput | null;
  ClientEvent?: ClientEventCreateManyWithoutReqUserInput | null;
  createdAt?: any | null;
  createdBy?: UserCreateOneWithoutUsersCreatedInput | null;
  email: string;
  id?: string | null;
  name: string;
  password?: string | null;
  postsCreatedJ?: PostCreateManyWithoutCreatedByInput | null;
  postsUpdatedJ?: PostCreateManyWithoutUpdatedByInput | null;
  roles?: UserCreaterolesInput | null;
  updatedAt?: any | null;
  updatedBy?: UserCreateOneWithoutUsersUpdatedInput | null;
  usersCreated?: UserCreateManyWithoutCreatedByInput | null;
  usersUpdated?: UserCreateManyWithoutUpdatedByInput | null;
}

export interface UserCreateWithoutPostsCreatedJInput {
  ApiAccess?: ApiAccessCreateManyWithoutReqUserInput | null;
  ApiError?: ApiErrorCreateManyWithoutReqUserInput | null;
  ClientEvent?: ClientEventCreateManyWithoutReqUserInput | null;
  createdAt?: any | null;
  createdBy?: UserCreateOneWithoutUsersCreatedInput | null;
  email: string;
  id?: string | null;
  name: string;
  password?: string | null;
  postsAuthoredJ?: PostCreateManyWithoutAuthorInput | null;
  postsUpdatedJ?: PostCreateManyWithoutUpdatedByInput | null;
  roles?: UserCreaterolesInput | null;
  updatedAt?: any | null;
  updatedBy?: UserCreateOneWithoutUsersUpdatedInput | null;
  usersCreated?: UserCreateManyWithoutCreatedByInput | null;
  usersUpdated?: UserCreateManyWithoutUpdatedByInput | null;
}

export interface UserCreateWithoutPostsUpdatedJInput {
  ApiAccess?: ApiAccessCreateManyWithoutReqUserInput | null;
  ApiError?: ApiErrorCreateManyWithoutReqUserInput | null;
  ClientEvent?: ClientEventCreateManyWithoutReqUserInput | null;
  createdAt?: any | null;
  createdBy?: UserCreateOneWithoutUsersCreatedInput | null;
  email: string;
  id?: string | null;
  name: string;
  password?: string | null;
  postsAuthoredJ?: PostCreateManyWithoutAuthorInput | null;
  postsCreatedJ?: PostCreateManyWithoutCreatedByInput | null;
  roles?: UserCreaterolesInput | null;
  updatedAt?: any | null;
  updatedBy?: UserCreateOneWithoutUsersUpdatedInput | null;
  usersCreated?: UserCreateManyWithoutCreatedByInput | null;
  usersUpdated?: UserCreateManyWithoutUpdatedByInput | null;
}

export interface UserCreateWithoutUpdatedByInput {
  ApiAccess?: ApiAccessCreateManyWithoutReqUserInput | null;
  ApiError?: ApiErrorCreateManyWithoutReqUserInput | null;
  ClientEvent?: ClientEventCreateManyWithoutReqUserInput | null;
  createdAt?: any | null;
  createdBy?: UserCreateOneWithoutUsersCreatedInput | null;
  email: string;
  id?: string | null;
  name: string;
  password?: string | null;
  postsAuthoredJ?: PostCreateManyWithoutAuthorInput | null;
  postsCreatedJ?: PostCreateManyWithoutCreatedByInput | null;
  postsUpdatedJ?: PostCreateManyWithoutUpdatedByInput | null;
  roles?: UserCreaterolesInput | null;
  updatedAt?: any | null;
  usersCreated?: UserCreateManyWithoutCreatedByInput | null;
  usersUpdated?: UserCreateManyWithoutUpdatedByInput | null;
}

export interface UserCreateWithoutUsersCreatedInput {
  ApiAccess?: ApiAccessCreateManyWithoutReqUserInput | null;
  ApiError?: ApiErrorCreateManyWithoutReqUserInput | null;
  ClientEvent?: ClientEventCreateManyWithoutReqUserInput | null;
  createdAt?: any | null;
  createdBy?: UserCreateOneWithoutUsersCreatedInput | null;
  email: string;
  id?: string | null;
  name: string;
  password?: string | null;
  postsAuthoredJ?: PostCreateManyWithoutAuthorInput | null;
  postsCreatedJ?: PostCreateManyWithoutCreatedByInput | null;
  postsUpdatedJ?: PostCreateManyWithoutUpdatedByInput | null;
  roles?: UserCreaterolesInput | null;
  updatedAt?: any | null;
  updatedBy?: UserCreateOneWithoutUsersUpdatedInput | null;
  usersUpdated?: UserCreateManyWithoutUpdatedByInput | null;
}

export interface UserCreateWithoutUsersUpdatedInput {
  ApiAccess?: ApiAccessCreateManyWithoutReqUserInput | null;
  ApiError?: ApiErrorCreateManyWithoutReqUserInput | null;
  ClientEvent?: ClientEventCreateManyWithoutReqUserInput | null;
  createdAt?: any | null;
  createdBy?: UserCreateOneWithoutUsersCreatedInput | null;
  email: string;
  id?: string | null;
  name: string;
  password?: string | null;
  postsAuthoredJ?: PostCreateManyWithoutAuthorInput | null;
  postsCreatedJ?: PostCreateManyWithoutCreatedByInput | null;
  postsUpdatedJ?: PostCreateManyWithoutUpdatedByInput | null;
  roles?: UserCreaterolesInput | null;
  updatedAt?: any | null;
  updatedBy?: UserCreateOneWithoutUsersUpdatedInput | null;
  usersCreated?: UserCreateManyWithoutCreatedByInput | null;
}

export interface UserCreaterolesInput {
  set: UserRole[];
}

export interface UserWhereUniqueInput {
  email?: string | null;
  id?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
