/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { i18n } from '@kbn/i18n';

import type { ExpressionFunctionDefinition, Datatable, Render } from '../../expressions/public';
import { RegionMapVisConfig } from './region_map_types';

interface Arguments {
  visConfig: string | null;
}

export interface RegionMapVisRenderValue {
  visData: Datatable;
  visType: 'region_map';
  visConfig: RegionMapVisConfig;
}

export type RegionMapExpressionFunctionDefinition = ExpressionFunctionDefinition<
  'regionmap',
  Datatable,
  Arguments,
  Render<RegionMapVisRenderValue>
>;

export const createRegionMapFn = (): RegionMapExpressionFunctionDefinition => ({
  name: 'regionmap',
  type: 'render',
  context: {
    types: ['datatable'],
  },
  help: i18n.translate('regionMap.function.help', {
    defaultMessage: 'Regionmap visualization',
  }),
  args: {
    visConfig: {
      types: ['string', 'null'],
      default: '"{}"',
      help: '',
    },
  },
  fn(context, args, handlers) {
    const visConfig = args.visConfig && JSON.parse(args.visConfig);

    if (handlers?.inspectorAdapters?.tables) {
      handlers.inspectorAdapters.tables.logDatatable('default', context);
    }
    return {
      type: 'render',
      as: 'region_map_vis',
      value: {
        visData: context,
        visType: 'region_map',
        visConfig,
      },
    };
  },
});
