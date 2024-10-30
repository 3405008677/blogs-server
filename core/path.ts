import path from "path";

/**
 * 获取用户根目录
 * @param dir file path
 */
export function getRootPath(...dir: string[]) {
  return path.resolve(process.cwd(), ...dir);
}

/**
 * 返回 当前项目下的绝对路径
 * @param dir 路径-相对
 */
export function pathResolve(dir: string) {
  // 栗子:path.resolve('/foo/bar','.','/tmp/file')
  // /foo/bar/temp/file
  return path.resolve(process.cwd(), ".", dir);
}
