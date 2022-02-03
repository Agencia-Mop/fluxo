export type ActionProps = {
  name?: string;
  type: string;
  action: string;
  actionOptions: {[key: string]: any}[];
  [key: string]: any;
}
