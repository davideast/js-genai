/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

// Code generated by the Google Gen AI SDK generator DO NOT EDIT.

import {ApiClient} from './_api_client';
import * as common from './_common';
import {BaseModule} from './_common';
import * as t from './_transformers';
import {PagedItem, Pager} from './pagers';
import * as types from './types';

export class Files extends BaseModule {
  constructor(private readonly apiClient: ApiClient) {
    super();
  }

  /**
   * This method lists all files from the service.
   *
   * @param params - The parameters for the list request
   * @returns The paginated results of the list of files
   *
   * @example
   * The following code prints the names of all files from the service, the
   * szie of each page is 2.
   *
   * const listResponse = await client.files.list({config: {'pageSize': 2}});
   * for await (const file of listResponse) {
   *   console.log(file.name());
   * }
   */
  list = async (
    params: types.ListFilesParameters = {},
  ): Promise<Pager<types.File>> => {
    return new Pager<types.File>(
      PagedItem.PAGED_ITEM_FILES,
      this.listInternal,
      await this.listInternal(params),
      params.config,
    );
  };

  private async listInternal(
    params: types.ListFilesParameters,
  ): Promise<types.ListFilesResponse> {
    let response: Promise<types.ListFilesResponse>;
    let path: string = '';
    let body: Record<string, any> = {};
    const kwargs: Record<string, any> = {};
    kwargs['config'] = params.config;
    if (this.apiClient.isVertexAI()) {
      body = listFilesParametersToVertex(this.apiClient, kwargs);
      path = common.formatMap('None', body['_url']);
      delete body['config'];
      response = this.apiClient.get(
        path,
        body,
        types.ListFilesResponse,
        params.config?.httpOptions,
      );

      return response.then((apiResponse) => {
        const resp = listFilesResponseFromVertex(this.apiClient, apiResponse);
        let typed_resp = new types.ListFilesResponse();
        Object.assign(typed_resp, resp);
        return typed_resp;
      });
    } else {
      body = listFilesParametersToMldev(this.apiClient, kwargs);
      path = common.formatMap('files', body['_url']);
      delete body['config'];
      response = this.apiClient.get(
        path,
        body,
        types.ListFilesResponse,
        params.config?.httpOptions,
      );

      return response.then((apiResponse) => {
        const resp = listFilesResponseFromMldev(this.apiClient, apiResponse);
        let typed_resp = new types.ListFilesResponse();
        Object.assign(typed_resp, resp);
        return typed_resp;
      });
    }
  }

  async get(params: types.GetFileParameters): Promise<types.File> {
    let response: Promise<types.File>;
    let path: string = '';
    let body: Record<string, any> = {};
    const kwargs: Record<string, any> = {};
    kwargs['name'] = params.name;
    kwargs['config'] = params.config;
    if (this.apiClient.isVertexAI()) {
      body = getFileParametersToVertex(this.apiClient, kwargs);
      path = common.formatMap('None', body['_url']);
      delete body['config'];
      response = this.apiClient.get(
        path,
        body,
        undefined,
        params.config?.httpOptions,
      );

      return response.then((apiResponse) => {
        const resp = fileFromVertex(this.apiClient, apiResponse);

        return resp as types.File;
      });
    } else {
      body = getFileParametersToMldev(this.apiClient, kwargs);
      path = common.formatMap('files/{file}', body['_url']);
      delete body['config'];
      response = this.apiClient.get(
        path,
        body,
        undefined,
        params.config?.httpOptions,
      );

      return response.then((apiResponse) => {
        const resp = fileFromMldev(this.apiClient, apiResponse);

        return resp as types.File;
      });
    }
  }
}

function listFilesConfigToMldev(
  apiClient: ApiClient,
  fromObject: types.ListFilesConfig,
  parentObject?: Record<string, any>,
): Record<string, any> {
  const toObject: Record<string, any> = {};

  const fromPageSize = common.getValueByPath(fromObject, ['pageSize']);
  if (parentObject !== undefined && fromPageSize !== undefined) {
    common.setValueByPath(parentObject, ['_query', 'pageSize'], fromPageSize);
  }

  const fromPageToken = common.getValueByPath(fromObject, ['pageToken']);
  if (parentObject !== undefined && fromPageToken !== undefined) {
    common.setValueByPath(parentObject, ['_query', 'pageToken'], fromPageToken);
  }

  return toObject;
}

function listFilesConfigToVertex(
  apiClient: ApiClient,
  fromObject: types.ListFilesConfig,
  parentObject?: Record<string, any>,
): Record<string, any> {
  const toObject: Record<string, any> = {};

  const fromPageSize = common.getValueByPath(fromObject, ['pageSize']);
  if (parentObject !== undefined && fromPageSize !== undefined) {
    common.setValueByPath(parentObject, ['_query', 'pageSize'], fromPageSize);
  }

  const fromPageToken = common.getValueByPath(fromObject, ['pageToken']);
  if (parentObject !== undefined && fromPageToken !== undefined) {
    common.setValueByPath(parentObject, ['_query', 'pageToken'], fromPageToken);
  }

  return toObject;
}

function listFilesParametersToMldev(
  apiClient: ApiClient,
  fromObject: types.ListFilesParameters,
  parentObject?: Record<string, any>,
): Record<string, any> {
  const toObject: Record<string, any> = {};

  const fromConfig = common.getValueByPath(fromObject, ['config']);
  if (fromConfig !== undefined) {
    common.setValueByPath(
      toObject,
      ['config'],
      listFilesConfigToMldev(apiClient, fromConfig, toObject),
    );
  }

  return toObject;
}

function listFilesParametersToVertex(
  apiClient: ApiClient,
  fromObject: types.ListFilesParameters,
  parentObject?: Record<string, any>,
): Record<string, any> {
  const toObject: Record<string, any> = {};

  if (common.getValueByPath(fromObject, ['config']) !== undefined) {
    throw new Error('config parameter is not supported in Vertex AI.');
  }

  return toObject;
}

function getFileParametersToMldev(
  apiClient: ApiClient,
  fromObject: types.GetFileParameters,
  parentObject?: Record<string, any>,
): Record<string, any> {
  const toObject: Record<string, any> = {};

  const fromName = common.getValueByPath(fromObject, ['name']);
  if (fromName !== undefined) {
    common.setValueByPath(
      toObject,
      ['_url', 'file'],
      t.tFileName(apiClient, fromName),
    );
  }

  const fromConfig = common.getValueByPath(fromObject, ['config']);
  if (fromConfig !== undefined) {
    common.setValueByPath(toObject, ['config'], fromConfig);
  }

  return toObject;
}

function getFileParametersToVertex(
  apiClient: ApiClient,
  fromObject: types.GetFileParameters,
  parentObject?: Record<string, any>,
): Record<string, any> {
  const toObject: Record<string, any> = {};

  if (common.getValueByPath(fromObject, ['name']) !== undefined) {
    throw new Error('name parameter is not supported in Vertex AI.');
  }

  if (common.getValueByPath(fromObject, ['config']) !== undefined) {
    throw new Error('config parameter is not supported in Vertex AI.');
  }

  return toObject;
}

function fileStatusFromMldev(
  apiClient: ApiClient,
  fromObject: types.FileStatus,
  parentObject?: Record<string, any>,
): Record<string, any> {
  const toObject: Record<string, any> = {};

  const fromDetails = common.getValueByPath(fromObject, ['details']);
  if (fromDetails !== undefined) {
    common.setValueByPath(toObject, ['details'], fromDetails);
  }

  const fromMessage = common.getValueByPath(fromObject, ['message']);
  if (fromMessage !== undefined) {
    common.setValueByPath(toObject, ['message'], fromMessage);
  }

  const fromCode = common.getValueByPath(fromObject, ['code']);
  if (fromCode !== undefined) {
    common.setValueByPath(toObject, ['code'], fromCode);
  }

  return toObject;
}

function fileStatusFromVertex(
  apiClient: ApiClient,
  fromObject: types.FileStatus,
  parentObject?: Record<string, any>,
): Record<string, any> {
  const toObject: Record<string, any> = {};

  return toObject;
}

function fileFromMldev(
  apiClient: ApiClient,
  fromObject: types.File,
  parentObject?: Record<string, any>,
): Record<string, any> {
  const toObject: Record<string, any> = {};

  const fromName = common.getValueByPath(fromObject, ['name']);
  if (fromName !== undefined) {
    common.setValueByPath(toObject, ['name'], fromName);
  }

  const fromDisplayName = common.getValueByPath(fromObject, ['displayName']);
  if (fromDisplayName !== undefined) {
    common.setValueByPath(toObject, ['displayName'], fromDisplayName);
  }

  const fromMimeType = common.getValueByPath(fromObject, ['mimeType']);
  if (fromMimeType !== undefined) {
    common.setValueByPath(toObject, ['mimeType'], fromMimeType);
  }

  const fromSizeBytes = common.getValueByPath(fromObject, ['sizeBytes']);
  if (fromSizeBytes !== undefined) {
    common.setValueByPath(toObject, ['sizeBytes'], fromSizeBytes);
  }

  const fromCreateTime = common.getValueByPath(fromObject, ['createTime']);
  if (fromCreateTime !== undefined) {
    common.setValueByPath(toObject, ['createTime'], fromCreateTime);
  }

  const fromExpirationTime = common.getValueByPath(fromObject, [
    'expirationTime',
  ]);
  if (fromExpirationTime !== undefined) {
    common.setValueByPath(toObject, ['expirationTime'], fromExpirationTime);
  }

  const fromUpdateTime = common.getValueByPath(fromObject, ['updateTime']);
  if (fromUpdateTime !== undefined) {
    common.setValueByPath(toObject, ['updateTime'], fromUpdateTime);
  }

  const fromSha256Hash = common.getValueByPath(fromObject, ['sha256Hash']);
  if (fromSha256Hash !== undefined) {
    common.setValueByPath(toObject, ['sha256Hash'], fromSha256Hash);
  }

  const fromUri = common.getValueByPath(fromObject, ['uri']);
  if (fromUri !== undefined) {
    common.setValueByPath(toObject, ['uri'], fromUri);
  }

  const fromDownloadUri = common.getValueByPath(fromObject, ['downloadUri']);
  if (fromDownloadUri !== undefined) {
    common.setValueByPath(toObject, ['downloadUri'], fromDownloadUri);
  }

  const fromState = common.getValueByPath(fromObject, ['state']);
  if (fromState !== undefined) {
    common.setValueByPath(toObject, ['state'], fromState);
  }

  const fromSource = common.getValueByPath(fromObject, ['source']);
  if (fromSource !== undefined) {
    common.setValueByPath(toObject, ['source'], fromSource);
  }

  const fromVideoMetadata = common.getValueByPath(fromObject, [
    'videoMetadata',
  ]);
  if (fromVideoMetadata !== undefined) {
    common.setValueByPath(toObject, ['videoMetadata'], fromVideoMetadata);
  }

  const fromError = common.getValueByPath(fromObject, ['error']);
  if (fromError !== undefined) {
    common.setValueByPath(
      toObject,
      ['error'],
      fileStatusFromMldev(apiClient, fromError, toObject),
    );
  }

  return toObject;
}

function fileFromVertex(
  apiClient: ApiClient,
  fromObject: types.File,
  parentObject?: Record<string, any>,
): Record<string, any> {
  const toObject: Record<string, any> = {};

  return toObject;
}

function listFilesResponseFromMldev(
  apiClient: ApiClient,
  fromObject: types.ListFilesResponse,
  parentObject?: Record<string, any>,
): Record<string, any> {
  const toObject: Record<string, any> = {};

  const fromNextPageToken = common.getValueByPath(fromObject, [
    'nextPageToken',
  ]);
  if (fromNextPageToken !== undefined) {
    common.setValueByPath(toObject, ['nextPageToken'], fromNextPageToken);
  }

  const fromFiles = common.getValueByPath(fromObject, ['files']);
  if (fromFiles !== undefined) {
    common.setValueByPath(
      toObject,
      ['files'],
      fromFiles!.map((item: any) => {
        return fileFromMldev(apiClient, item, toObject);
      }),
    );
  }

  return toObject;
}

function listFilesResponseFromVertex(
  apiClient: ApiClient,
  fromObject: types.ListFilesResponse,
  parentObject?: Record<string, any>,
): Record<string, any> {
  const toObject: Record<string, any> = {};

  return toObject;
}
