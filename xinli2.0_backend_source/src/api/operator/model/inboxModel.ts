export interface inboxSetting {
  id: number;
  title: string;
  content: string;
  updatedUser: string;
  updatedAt: string;
}

export interface inboxSettingList {
  list: inboxSetting[];
}

export interface inboxParams {
  memberAccount: string;
  status: number;
  type: number;
  title: string;
  page: number;
  pageSize: number;
}

export interface inbox {
  letterSettingId: number;
  type: number;
  title: string;
  content: string;
  memberCount: number;
  status: string;
  sendAt: string;
  updatedUser: string;
  updatedAt: string;
}

export interface inboxList {
  list: inbox[];
  count: number;
}

export interface inboxLetter {
  memberAccount: string[];
  sendAt: string;
  title: string;
  content: string;
}

interface letterStatus {
  id: number;
  memberAccount: string;
  status: string;
}

export interface letterMembers {
  list: letterStatus[];
}
