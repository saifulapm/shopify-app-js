import {Request, Response} from 'express';
import {
  ConfigParams as ApiConfigParams,
  Session,
  ShopifyRestResources,
  Shopify,
} from '@shopify/shopify-api';
import {SessionStorage} from '@shopify/shopify-app-session-storage';

import {AuthConfigInterface} from './auth/types';
import {WebhooksConfigInterface} from './webhooks/types';
import {
  ValidateAuthenticatedSessionMiddleware,
  CspHeadersMiddleware,
  EnsureInstalledMiddleware,
} from './middlewares/types';
import {AppMiddleware} from './shopify-app/types';

export * from './auth/types';
export * from './middlewares/types';
export * from './webhooks/types';

export interface AppConfigParams<
  R extends ShopifyRestResources = any,
  S extends SessionStorage = SessionStorage,
> {
  api?: Partial<ApiConfigParams<R>>;
  useOnlineTokens?: boolean;
  exitIframePath?: string;
  auth?: Partial<AuthConfigInterface>;
  webhooks?: Partial<WebhooksConfigInterface>;
  sessionStorage?: S;
}

export interface AppConfigInterface<
  R extends ShopifyRestResources = any,
  S extends SessionStorage = SessionStorage,
> extends Omit<AppConfigParams<R, S>, 'api'> {
  logger: Shopify['logger'];
  useOnlineTokens: boolean;
  exitIframePath: string;
  auth: AuthConfigInterface;
  webhooks: WebhooksConfigInterface;
  sessionStorage: S;
}

export interface ApiAndConfigParams {
  api: Shopify;
  config: AppConfigInterface;
}

export interface ShopifyApp<
  R extends ShopifyRestResources = any,
  S extends SessionStorage = SessionStorage,
> {
  config: AppConfigInterface<S>;
  api: Shopify<R>;
  app: AppMiddleware;
  validateAuthenticatedSession: ValidateAuthenticatedSessionMiddleware;
  cspHeaders: CspHeadersMiddleware;
  ensureInstalledOnShop: EnsureInstalledMiddleware;
}

export interface RedirectToAuthParams extends ApiAndConfigParams {
  req: Request;
  res: Response;
}

export interface RedirectToHostParams {
  req: Request;
  res: Response;
  api: Shopify;
  config: AppConfigInterface;
  session: Session;
}

export interface ReturnTopLevelRedirectionParams {
  res: Response;
  config: AppConfigInterface;
  bearerPresent: boolean;
  redirectUrl: string;
}