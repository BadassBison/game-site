/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// import { relative, Path } from "../../../angular_devkit/core/src/virtual-fs";
import { Path, basename, dirname, join, normalize } from '@angular-devkit/core';

export interface Location {
  name: string;
  path: Path;
  rootPath: Path;
}

export function parseName(path: string, name: string): Location {
  const nameWithoutPath = basename(normalize(name));
  const gamePath = dirname(join(normalize(path), '/games/', name) as Path);
  const rootPath = dirname(normalize(path));

  return {
    name: nameWithoutPath,
    path: normalize(`/${gamePath}`),
    rootPath: normalize(`/${rootPath}`)
  };
}
