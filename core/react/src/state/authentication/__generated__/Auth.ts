/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AuthInputType } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: Auth
// ====================================================

export interface Auth_auth {
  __typename: "Token";
  accessToken: string | null;
  refreshToken: string | null;
  userId: string | null;
  roles: (string | null)[] | null;
}

export interface Auth {
  auth: Auth_auth | null;
}

export interface AuthVariables {
  data: AuthInputType;
}
