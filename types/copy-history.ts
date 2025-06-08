export type CopyHistoryItem = {
  id: string;
  content: any;
  contentType: string;
  copyAt: Date;
  remark?: string | null;
}