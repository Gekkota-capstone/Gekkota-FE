export type CageList = {
  id: number;
  name: string;
  species: string;
  gender: string;
  birthdate: string;
}[];

export interface BehaviorAnalyticsResponse {
  abnormalBehavior: string;
  highlightVideoUrl: string | null;
  bioPattern: {
    wakeUp: { start: number; end: number };
    sleep: { start: number; end: number };
    mostActive: { start: number; end: number };
  };
  heatmapImageUrl: string | null;

  recentDatOfActivity: { day: string; value: number }[];
  timeOfActivity: { hour: string; value: number }[];
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
  date: string | null;
  weight: number | null;
  memo: string | null;
  shedding_status: null | '탈피예정' | '탈피 중' | '탈피 완료' | '탈피 실패';
  photo_urls: string[] | null;

  monthOfWeight: { day: string; value: number }[];
  yearOfWeight: { month: string; value: number }[];
}
export interface WeightHistoryResponse {
  monthOfWeight: { day: string; value: number }[];
  yearOfWeight: { month: string; value: number }[];
}

export interface FeedRecordResponse {
  id: number;
  date: string;
  food_type:
    | '사료'
    | '귀뚜라미'
    | '밀웜'
    | '슈퍼밀웜'
    | '왁스웜'
    | '누에'
    | '과일'
    | '채소';
  food_size: null | '극소' | '소' | '중' | '대' | '특대';
  food_amount: number | null;
  amount_unit: null | '마리' | 'ml' | 'g';
  memo: string | null;
}

export interface CleanRecordResponse {
  id: number;
  date: string;
  memo: string | null;
}
export interface LLMMessageResponse {
  messages: {
    id: number;
    question: string;
    answer: string;
    created_at: string;
  }[];
}

export interface CageState {
  pet_id: string;
  is_hiding: boolean;
}

export interface DevicesInfo {
  sn: string;
  IP: string;
  rtsp_url: string;
  device_id: string;
}
