import {
  Rule,
  Tree,
  SchematicContext,
  SchematicsException,
  apply,
  url,
  applyTemplates,
  move,
  chain,
  mergeWith
} from '@angular-devkit/schematics';

import {
  strings,
  normalize,
  experimental
} from '@angular-devkit/core';

import { Schema as NewGameOptions } from './schema';

export function game(_options: NewGameOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    const workspaceConfig = tree.read('/angular.json');
    if (!workspaceConfig) {
      throw new SchematicsException('Could not find Angular workspace configuration');
    }

    const workspaceContent = workspaceConfig.toString();
    const workspace: experimental.workspace.WorkspaceSchema = JSON.parse(workspaceContent);

    if (!_options.project) {
      _options.project = workspace.defaultProject;
    }

    const projectName = _options.project as string;
    const project = workspace.projects[projectName];
    const projectType = project.projectType === 'application' ? 'app' : 'lib';

    if (_options.path === undefined) {
      _options.path = `${project.sourceRoot}/${projectType}`;
    }

    console.log(url('./'));

    const templateSource = apply(url('./game/files'), [
      applyTemplates({
        classify: strings.classify,
        dasherize: strings.dasherize,
        name: _options.name
      }),
      move(normalize(_options.path as string))
    ]);

    return chain([
      mergeWith(templateSource)
    ]);
  };
}
