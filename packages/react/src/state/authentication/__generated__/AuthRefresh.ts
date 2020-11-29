/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AuthRefreshInputType } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: AuthRefresh
// ====================================================

export interface AuthRefresh_authRefresh {
  __typename: "Token";
  accessToken: string | null;
  refreshToken: string | null;
  userId: string | null;
  roles: (string | null)[] | null;
}

export interface AuthRefresh {
  authRefresh: AuthRefresh_authRefresh | null;
}

export interface AuthRefreshVariables {
  data: AuthRefreshInputType;
}
