export interface CageList {
  list: {
    id: number;
    name: string;
    species: string;
    gender: string;
    birthdate: string;
  }[];
}

export interface BehaviorAnalyticsResponse {
  abnormalBehavior: string;
  highlightVideoUrl: string | null;
  bioPattern: {
    wakeUp: { start: number; end: number };
    sleep: { start: number; end: number };
    mostActive: { start: number; end: number };
  };
  heatmapImageUrl: string | null;
  activityGraph: {
    type: 'hourly' | 'daily';
    data: [20, 45, 28, 80, 99, 43, 54, 33, 22];
  };
}

export interface LiveCameras {
  camera1: {
    cameraId: number;
    streamUrl: string;
  };
  camera2: {
    cameraId: 2;
    streamUrl: string;
  };
}

export interface HealthRecordResponse {
  id: number;
  date: string;
  weight: number;
  memo: string;
  shedding_status: null | '탈피예정' | '탈피 중' | '탈피 완료' | '탈피 실패';
  photo_urls: string[] | null;
}
export interface WeightHistoryResponse {
  monthOfWeight: { day: string; value: number }[];
  yearOfWeight: { month: string; value: number }[];
}
export interface LLMMessageResponse {
  messages: { say: string; text: string }[];
}

export interface CageState {
  state: 'sleeping' | 'standing' | 'active' | 'eating';
}
