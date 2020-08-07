export class DepResolverError extends Error {
  constructor(message: string) {
    super(message);
  }
}
function removeExcluded(
  depMap: { [key: string]: any },
  node: string,
  excludeItems: string[]
) {
  depMap[node] = depMap[node].filter(function (item: string) {
    return !excludeItems.includes(item);
  });
}

function validateDep(
  depMap: { [key: string]: string[] },
  node: string,
  dependency: string
) {
  if (!depMap.hasOwnProperty(dependency)) {
    throw new DepResolverError(
      `"${node}" has an unknown dependency "${dependency}"`
    );
  }
}

function validateDepMap(
  depMap: { [key: string]: string[] },
  options?: { exclude?: string[] }
) {
  for (let node in depMap) {
    if (!depMap.hasOwnProperty(node)) {
      continue;
    }
    if (options && options.exclude) {
      removeExcluded(depMap, node, options.exclude);
    }
    depMap[node].forEach(validateDep.bind(null, depMap, node));
  }
}

function resolveSpecific(
  depMap: { [key: string]: string[] },
  result: string[],
  dependant: string,
  path: string[]
) {
  if (path.indexOf(dependant) !== path.lastIndexOf(dependant)) {
    throw new DepResolverError(
      `circular dependency found: ${path.join(" > ")}`
    );
  }

  if (depMap[dependant]) {
    depMap[dependant].forEach(function (depender) {
      resolveSpecific(depMap, result, depender, path.concat(depender));
    });
  }

  if (!result.includes(dependant)) {
    result.push(dependant);
    delete depMap[dependant];
  }
}

export function resolve(
  depMap: { [key: string]: string[] },
  options?: { exclude?: string[] }
) {
  let result: string[] = [];

  validateDepMap(depMap, options);

  for (let node in depMap) {
    if (!depMap.hasOwnProperty(node)) {
      continue;
    }
    resolveSpecific(depMap, result, node, [node]);
  }

  return result;
}
export default resolve;
