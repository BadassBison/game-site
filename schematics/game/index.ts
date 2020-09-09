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
  experimental
} from '@angular-devkit/core';

import { parseName } from '../utility/parse-name';
import { Schema as NewGameOptions } from './schema';

export function game(_options: NewGameOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    const workspaceConfig = tree.read('./angular.json');
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
    const games = tree.getDir('./src/app/games').subdirs.map(fragment => fragment.toString());
    games.push(_options.name);

    console.log({ games });

    if (_options.path === undefined) {
      _options.path = `${project.sourceRoot}/${projectType}`;
    }

    const parsedPath = parseName(_options.path, _options.name);
    _options.name = parsedPath.name;
    _options.path = parsedPath.path;

    const gameTemplateSource = apply(url('./files/game-template'), [
      applyTemplates({
        classify: strings.classify,
        dasherize: strings.dasherize,
        name: _options.name
      }),
      move(parsedPath.path)
    ]);
    const appTemplateSource = apply(url('./files/app-template'), [
      applyTemplates({
        classify: strings.classify,
        dasherize: strings.dasherize,
        name: _options.name,
        games
      }),
      move(parsedPath.rootPath)
    ]);

    tree.delete('src/app/app.component.html');

    return chain([
      mergeWith(gameTemplateSource),
      mergeWith(appTemplateSource)
    ]);
  };
}
