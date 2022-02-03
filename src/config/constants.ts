import { join } from "path";

export const PATH_ROOT = process.env.PWD || '';
export const PATH_FLOWS = join(PATH_ROOT, 'flows');
export const PATH_ACTIONS = join(PATH_ROOT, 'src', 'Actions');
export const PATH_DOWNLOADS = join(PATH_ROOT, 'downloads');

export const DEBUG = true;
